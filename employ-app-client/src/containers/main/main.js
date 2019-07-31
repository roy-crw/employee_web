/**
 *@Date 2019/7/9
 *@author: roy
 *@function: 主界面路由组件
 */

import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import LaobanInfo from '../laoban-info/laoban-info';
import DashenInfo from '../dashen-info/dashen-info';
import Laoban from '../laoban/laoban';
import Dashen from '../dashen/dashen';
import Message from '../message/message';
import Personal from '../personal/personal';
import NotFound from '../../components/not-found/not-found';
import NavFooter from '../../components/nav-footer/nav-footer';
import Chat from '../../containers/chat/chat';

import {NavBar} from 'antd-mobile';

import {connect} from 'react-redux';
import Cookies from 'js-cookie';

import {getRedirectTo} from '../../utils/getRedirectTo';

import '../../assets/css/index.css';

class Main extends Component {

    // 主界面的导航界面
    // 所有导航组件信息。 在首页通过导航栏能够任意切换对应的 组件。
    // icon 对应图标, text 对应文件。 title 对应列表标题。component 对应页面内组件。
    navList = [
        {
            path: '/laoban',
            component: Laoban,
            title: '大神列表',
            icon:'a1',
            text:'大神',
            hide:true
        },
        {
            path: '/dashen',
            component: Dashen,
            title: '老板列表',
            icon:'a2',
            text:'老板',
        },
        {
            path: '/message',
            component: Message,
            title: '消息列表',
            icon:'a3',
            text:'消息',
        },
        {
            path: '/personal',
            component: Personal,
            title: '用户中心',
            icon:'a4',
            text:'个人',
        },
    ]

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

        // debugger
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

        const {navList} = this; // 记录app 当前的状态.
        const path = this.props.location.pathname; // 请求路径
        const currentNav = navList.find( nav => nav.path === path ); // 返回与当前路径相同的 导航信息。被动切换。

        if(currentNav) {
            if(user.type === 'laoban' ) {
                // 隐藏第2个组件路径
                navList[1].hide = true;
                navList[0].hide = false;
            } else {
                // 隐藏第1个组件路径
                navList[0].hide = true;
                navList[1].hide = false;
            }
        }

        // 通过这种形式定义路由 跳转路径 以及 对应页面组件。

        return (
            <div>
                { currentNav ? <NavBar> { currentNav.title } </NavBar> : null }
                <Switch>
                    {
                        navList.map( nav => <Route path={nav.path} component={nav.component} /> )
                    }
                    <Route path={'/laobaninfo'} component={LaobanInfo} />
                    <Route path={'/dasheninfo'} component={DashenInfo} />
                    <Route path={'/chat/:userid'} component={Chat} />
                    <Route componen={NotFound} />
                </Switch>
                { currentNav ? <NavFooter  navList={navList} /> : null }
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



