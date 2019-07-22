/**
 *@Date 2019/7/9
 *@author: roy
 *@function: 主界面路由组件
 */

import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import LaobanInfo from '../laoban-info/laoban-info';
import DashenInfo from '../dashen-info/dashen-info';
import {connect} from 'react-redux';
import Cookies from 'js-cookie';

import {getRedirectTo} from '../../utils/getRedirectTo';

class Main extends Component {

    componentDidMount() {
        // 如果有 userid， 说明登录过（有cookie），但目前未登录（redux 中没有 user._id）。则发请求，请求对应的 User.
        const userid = Cookies.get('userid');
        const {_id} = this.props.user;
        if( userid && !_id ) { // 当前应用状态.
            console.log('发送 ajax 请求获取 user ');
        }

    }

    render() {

        // 读取 cookie 中的 userid
        const userid = Cookies.get('userid');

        // 如果没有， 自动定向到 登录界面
        if(!userid){
            return <Redirect to={'/login'}/>
        }

        // 如果有 userid， 说明登录过（有cookie），但目前未登录（redux 中没有 user._id）。则发请求，请求对应的 User.
        // 使用 componentDidMount() 来处理自动登录

        // 如果有， 读取 redux 中的 user 状态
        const { user } = this.props;

        debugger
        // 如果 user 没有 _id， 返回 null( 不做任何显示 )
        if( !user._id ){
            return null;
        } else {
            // user 有 _id, 显示对应的界面
            let path = this.props.location.pathname;
            if( path === '/' ) {
                // 重定向路径
                path = getRedirectTo( user.type, user.header );
                return <Redirect to = {path}/>
            }

        }

        return (
            <div>
                <Switch>
                    <Route path={'/laobaninfo'} component={LaobanInfo} />
                    <Route path={'/dasheninfo'} component={DashenInfo} />
                </Switch>
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user }),
    {}
)(Main);

/* 在主界面内实现自动登录 */
/*
* 1. 自动登录实现
*   1). 如果 cookie 中有 userid， 发请求获取对应的 user
*   2). 如果 cookie 中没有userid, 自动进入login 界面
* 2. 如果已经登录，请求跳转到根路径。
*   根据 user 的type 进行跳转。
* */



