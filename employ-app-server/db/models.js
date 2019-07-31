

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

const chatSchema = mongoose.Schema({
    from:{ type:String, required:true },
    to:{ type:String, required:true },
    chat_id:{ type:String, required:true }, // 根据 from 与 to 生成的加密串, 唯一标识同一聊天记录。
    content:{ type:String, required:true }, // 每次对话的内容。
    read: { type:Boolean, default:false }, // 标识是否已读。
    create_time: { type:Number }  // 创建时间。
});

const ChatModel = mongoose.model('chat', chatSchema);

// 对外暴露 Model
exports.UserModel = UserModel;

exports.ChatModel = ChatModel;

