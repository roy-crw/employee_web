

/* 1. get connected */
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/employee');

const conn = mongoose.connection;

conn.on('connected', ()=>{
    console.log('db connect success!')
})

/* 2. 定义对象集合 model 并向外暴露  */
// 定义 Schema （描述文档结构）
const userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    type: {type:String, required: true},
    header: {type: String}, // 头像名称
    post: {type: String},   // 职位
    info: {type: String},   // 职位信息
    company: {type: String},// 公司名称
    salary: {type: String}, // 月薪
});
// 定义 Model（与集合对应的模型）
const UserModel = mongoose.model('user', userSchema);

// 对外暴露 Model
exports.UserModel = UserModel;


