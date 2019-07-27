var express = require('express');
var router = express.Router();

const UserModel = require("../db/models").UserModel;

const encodeMd5 = require('blueimp-md5');
const filter = {password: 0, __v: 0}; // 查询时不返回该属性，从而保密

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// 注册一个路由：用户注册
/*
* 请求方式为 post
* path 为 /register
* 接受参数为 username 和 password
* 注册成功返回： { code: 0, date { id: 'abc', username:'xxx', password:'123' }
* 注册失败返回： { code: 1, msg: '这个用户已经存在' }
* */
/*
1.获取请求参数
2.处理
3.返回相应数据。
 */

/*
router.post('/register', function (req, res) {
    // 1.获取参数
   const {username, password} = req.body;
   if( username === 'admin' ) {
        // 返回对象失败
       res.send({ code:1, msg:'该用户无法被注册' });
   } else {
        res.send({ code: 0, data:{ id:'abc12',username:username } })
   }
});
*/

// 注册路由
router.post('/register', function (req, res) {

    const { username, password, type } = req.body;

    UserModel.findOne({ username }, function (err, userDoc) {
        if(userDoc){
            console.log("该用户已存在");
            res.send({ code: 1, msg: '此用户已存在' });
        } else {
            console.log("该用户不存在");
            new UserModel({ username, password:encodeMd5(password), type }).save(function (error, userDoc) {
                if(error){
                    console.log(error);
                }
                const data = {username, password, type, userDoc: userDoc };
                res.send({code: 0, data, error:error});
            })

        }
    })

})


// 登录路由
router.post('/login', function (req, res) {
    const {username, password} = req.body;
    // 根据 username 和 password 查询是否有数据存在。
    UserModel.findOne({username,password:encodeMd5(password) },filter, function (error, userDoc) {
        if(userDoc){ //存在该用户
            res.cookie('userid', userDoc._id, { maxAge: 1000*60*60*24 } );

            res.send({ code: 0, data: userDoc });

        } else { // 登录失败
            res.send({ code: 1, msg: '用户名或密码不正确！' });

        }
    })
})

// 更新用户信息的路由
router.post('/update', function (req, res) {
    // 需要根据 _id 来更新用户信息， 这里则是从用户 cookie 中获取。
    const userid = req.cookies.userid;
    if(!userid) {
        res.send({code:1, msg:'请先登录'});
        return;
    }
    const user = req.body;
    // findByIdAndUpdate( 查询id, 用户更新信息, 回调函数 ).
    UserModel.findByIdAndUpdate({_id: userid}, user, function (error, oldUser) {

        if(!oldUser) {  // 当前的登录信息不正确.
            res.clearCookie("userid");
            res.send({code:1, msg:'请先登录'})
        } else {
            let {_id, username, type } = oldUser;
            const obj = Object.assign(user, {_id, username, type } ); // 将新作变更信息与旧的变更信息完全合并一起 。
            res.send({ code:0, data: obj});

        }

    })

})

router.get('/user', function (req, res) {
    const userid = req.cookies.userid;

    if( !userid ) {
        return res.send({code:1, msg:"请先登录"})
    }
    UserModel.findOne({_id: userid}, filter, function (error, userDoc) {
        if( !userDoc ) {
            res.send({code:1, msg:"不存在该用户"})
        } else {
            res.send({code:0, data: userDoc})
        }
    })

})

// 获取用户列表（根据类型）
router.get('/userlist', function (req, res) {
    const {type} = req.query;
    UserModel.find({type}, filter, function ( err, userDoc ) {
        res.send({ code: 0, data: userDoc });
    } )

})


module.exports = router;


