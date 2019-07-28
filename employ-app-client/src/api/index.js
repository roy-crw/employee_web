
import ajax from './ajax';

// 进行异步请求的同一入口
// 注册入口 /register
export const reqRegister = (user) => ajax('/register', user, 'POST');

// 登录入口 /login
export const reqLogin = (user) => ajax('/login', user, 'POST');

// 更新用户接口 /update
export const reqUpdateUser = (user) => ajax('/update', user, 'POST' );

export const reqUserList = (type) => ajax('/userlist', {type});

