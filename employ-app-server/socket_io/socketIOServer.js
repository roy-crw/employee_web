/**
 *@Date 2019/8/2
 *@author: roy
 *@function: 处理 socketIo 请求
 */
const { ChatModel } = require('../db/models')
// 暴露接口， 用来被初始化
module.exports = function (server) {
    // 在服务器中得到 socket.io 对象
    const io = require('socket.io')(server);

    io.on('connection', function (socket) {
        console.log('有一个客户端连接上服务器');

        // 监听指定事件
        socket.on('sendMsg', function ({from, to, content}) {
            // 写入对话内容
            // 需要指定 chat_id 的生成方式， 由于 from_to 的位置不固定。所以这里使用排序的方法，进行固定
            const chat_id = [from, to].sort().join('_');
            const create_time = Date.now();
            new ChatModel({from, to, content, chat_id, create_time}).save(function (err, chatMsg) {
                // 需要找到对应的客户端，进行发送数据。 而我是发送给 对方的。
                // 这里的沟通： 1. 对方在线？ 2. 对方不在线
                // 发送的方式： 1. 广播屏蔽(简单)   2. 单独发送
                // >> 这里的问题是 是否需要发送给我自己？

                // socket.emit('receiveMsg', chatMsg ); // 这里发送给自己

                // 向所有连接的客户端发送消息, 将会包括自己
                //     并且需要在客户端上进行屏蔽无关消息

                socket.emit('receiveMsg', chatMsg); // 这里进行广播消息

            })

        })

    })

}


