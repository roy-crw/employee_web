import { reqRegister, reqLogin, reqUpdateUser } from '../api/index';
import {reqUserList, reqMsgList, reqReadMsg } from "../api";
import io from 'socket.io-client';
import {AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RECEIVE_USER_LIST, RESET_USER,
    RECEIVE_MEG_LIST, RECEIVE_MSG} from './action-types';

/*
* 创建和保持连接对象
* */
function initIO(dispatch, userid) {
    if( !io.socket ) { // 没有连接
        io.socket = io( 'ws://localhost:4000' );
    }
    // 接收到 server emit 方法发送过来的客户端
    // 前面说了，用广播形式进行传播。因此，过滤出 与当前用户相关的消息
    io.socket.on('receiveMsg', function (chatMsg) {
        console.log('连接并接受到消息:', chatMsg)
        // 过滤出与当前用户相关的消息
        dispatch(receiveMsg(chatMsg));
        // if( userid === chatMsg.from || userid === chatMsg.to ) {
        //     dispatch(receiveMsg(chatMsg));
        // }

    })


}

const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user })
const errorMsg = (msg) => ({ type:ERROR_MSG, data:msg })
// 接受用户同步信息
const receiveUser = (user) => ({type:RECEIVE_USER, data:user})
// 重置用户 信息
const resetUser = (msg)=>({type:RESET_USER, data:msg})

const receiveUserList = (userList) => ({ type: RECEIVE_USER_LIST, data: userList })

const receiveMsgList = ({users, chatMsgs}) => ({type: RECEIVE_MEG_LIST, data:{users, chatMsgs}});

const receiveMsg = ( chatMsg ) => ({ type: RECEIVE_MSG, data: chatMsg })

export const register = (user) => {
    const {username, password,password2, type} = user;
    if( !username ) {
        return errorMsg('用户名不能为空');
    }
    if(password !==password2) {
        return errorMsg('2次密码不一致');
    }

    // 表单数据合法
    return async dispatch => {

        /*const promise = reqRegister(user);
        promise.then( response => {
            const result = response.data;  // { code： 0/1, data: user, msg: '' }
        } )*/

        // 等同。
        const response = await reqRegister(user);
        const result = response.data;
            if( result.code === 0 ) { // 成功
                dispatch(authSuccess(result.data))
        } else { // 失败
            dispatch(errorMsg(result.data))
        }
    }
}

export const login = (user) => {
    const {username, password} = user;
    if( !username ) {
        return errorMsg('用户名不能为空');
    }
    if( !password ){
        return errorMsg('密码必须指定');
    }

    return async dispatch => {

        /*const promise = reqRegister(user);
        promise.then( response => {
            const result = response.data;  // { code： 0/1, data: user, msg: '' }
        } )*/

        // 等同。
        const response = await reqLogin(user);
        const result = response.data;
        if( result.code === 0 ) { // 成功
            dispatch(authSuccess(result.data))
        } else { // 失败
            dispatch(errorMsg(result.data))
        }
    }
}

// 异步更新 action
export const updateUser = (user) => {

    // 验证是否登录等放在服务器完成.

    return async (dispatch) => {

        const response = await reqUpdateUser(user);
        const result = response.data;
        if( result.code === 0 ) {  // 成功 // 不同的信号控制
            dispatch( receiveUser(result.data) );
        } else { // 失败
            dispatch( resetUser(result.msg) );
        }
    }
}


// 获取用户列表的异步 action
export const getUserList = (type) => {

    return async (dispatch) => {
        // 执行异步 ajax 请求
        const response = await reqUserList(type);
        const result = response.data;
        if( result.code === 0 ) {
            // 获取到数据后，进行封装消息。 并派发消息。
            dispatch(receiveUserList(result.data));

            // 此时开始获取 消息内容列表
            // debugger
            getMsgList(dispatch, result.data._id);
        }
    }
}

export const sendMsg = ({ from, to, content }) => {

    return (dispatch) => {
        console.log({ from , to , content })
        // 发送消息的时候才进行连接， 其他时候离线也可以
        // initIO();
        // 发消息
        io.socket.emit('sendMsg', {from, to, content});
    }
}

// 获取用户消息内容列表, 是在加载过程中被调用。而不是暴露给外部被调用。
async function getMsgList(dispatch, userid) {
    // 先进行连接对话
    initIO(dispatch, userid)

    const response = await reqMsgList();  // 和 async 前缀搭配使用。
    const result = response.data;
    if( result.code == 0 ) {
        // 有数据
        // debugger
        const { users, chatMsgs } = result.data;

        dispatch(receiveMsgList({ users, chatMsgs }))
    }

}



