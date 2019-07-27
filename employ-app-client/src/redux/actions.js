import { reqRegister, reqLogin, reqUpdateUser } from '../api/index';
import {AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RECEIVE_USER_LIST, RESET_USER} from './action-types';
import {reqUserList} from "../api";

const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user })
const errorMsg = (msg) => ({ type:ERROR_MSG, data:msg })
// 接受用户同步信息
const receiveUser = (user) => ({type:RECEIVE_USER, data:user})
// 重置用户 信息
const resetUser = (msg)=>({type:RESET_USER, data:msg})

const receiveUserList = (userList) => ({ type: RECEIVE_USER_LIST, data: userList })

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
    return async dispatch => {
        // 执行异步 ajax 请求
        const response = await reqUserList(type);
        const result = response.data;
        if( result.code === 0 ) {
            dispatch(receiveUserList(result));
        }

    }
}


