/**
 *@Date 2019/7/16
 *@author: roy
 *@function:
 *
 步骤：
 1.连接数据库
 2.获取创建数据库模型类
 3.通过数据库模型类进行 CRUD 操作
 */

/* 1.连接数据库 */
const encodeMd5 = require('blueimp-md5');
// 1. 连接数据库
const mongoose = require('mongoose');

// 2. 连接指定数据库
mongoose.connect('mongodb://localhost:27017/employee');
// 3.获取连接对象
const conn = mongoose.connection;
// 4.绑定连接完成的监听, 当成功连接后
conn.on('connected', function () { // 连接成功后的回调
    console.log('数据库连接成功，YE !!!');
})

/* 2. 集合以及文档 */
// 1. 定义 Schema 描述文档结构
const userSchema = mongoose.Schema({
    username: {type: String, required: true}, // 用户名
    password: {type: String, required: true}, // 密码
    type: {type:String, required: true},      // 用户类型
    header: {type: String}
});

// 2. 定义 model（与集合对应，可以操作集合）
//    这里 集合 'user' model 与上述的 Scheme 集合相对应。
const UserModel = mongoose.model('user', userSchema);

/* 3.进行 CRUD 操作上述模型 */
// 1. 通过 model 实例的 save( ) 方法添加数据

function testSave() {
    const userModel = new UserModel({
        username: 'Tom',
        password:encodeMd5('123'),
        type:'dashen'
    })
    // 调用 save() 保存数据
    userModel.save(function (error, userDoc) {
        console.log('添加 user, ', error, userDoc);
    });

}

// testSave();

// 2. 通过 Model 的find/findOne 查询多个或一个数据
function testFind() {
    // 
    UserModel.find(function (error, userDoc) {
        console.log('find()', error, userDoc);
    })

    UserModel.findOne( {username: 'Tom'}, function (error, userDoc) {
        console.log('findOne(), ', error, userDoc);
    } )

}

// testFind();

// 3. 通过 Model 的 findByIdAndUpdate() 更新某个数据

function testUpdate() {
    UserModel.findByIdAndUpdate( {_id: '5d32e8cbde83b72544eebc0c'}, {
        username:'Jack'
    }, function (error, userDoc) {
        console.log('findByIdandupdate(), ' + error + userDoc );
    } )
}

// testUpdate();


// 4. 通过 Model 的 remove() 删除匹配的数据

function testDelete() {
    UserModel.remove({ _id:'5d32e95c2a01ae3c286bf76d' }, function (error, userDoc) {
        console.log('remove(),' , error , userDoc );
    });
}

// testDelete();




