/**
 *@Date 2019/7/9
 *@author: roy
 *@function:
 */
import {combineReducers} from 'redux';
import { AUTH_SUCCESS, ERROR_MSG, RESET_USER, RECEIVE_USER } from './action-types';
import {getRedirectTo} from '../utils/getRedirectTo';

const initUser = {
    header: '',
    username: '',
    type: '',
    msg: '',
    redirectTo: '' // 设置状态转移中的重定向.
}

function user(state=initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            const {type, header} = action.data;
            console.log('action',action);
            return { ...action.data, redirectTo:getRedirectTo(type, header) };
        case ERROR_MSG:
            return { ...state, msg: action.data } ;
        case RECEIVE_USER:
            return action.data;
        case RESET_USER:
            return { ...initUser, msg: action.data }  // 初始化用户信息.
        default:
            return state;
    }
}



export default combineReducers({
    user
})
// 外部暴露状态结构： {xxx: 0, yyy: 0}

/*
不同用户类型，进入不同的界面路由
    dashen: /dashen
    laoban: /laoban
用户信息完善界面路由
    dashen: /dasheninfo
    laoban: /laobaninfo
判断是否已经完善信息？ user.header 是否有值
判断用户类型： user.type
*/
/*
    返回对应的路由路径
 */



