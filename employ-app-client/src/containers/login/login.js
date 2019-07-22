/**
 *@Date 2019/7/9
 *@author: roy
 *@function: 登录路由组件
 */
import React, {Component} from 'react';
import {NavBar, List,WingBlank,WhiteSpace,InputItem,Button } from 'antd-mobile';
import Logo from '../../components/logo/logo';
import {connect} from 'react-redux';
import {login} from '../../redux/actions';
import {Redirect} from 'react-router-dom';

class Login extends Component {

    state = {
        username: '',
        password: '',
        redirectTo: ''
    }
    handleChange = (name, val) => {
        this.setState({
            [name]:val
        })
    }
    login = () => {
        this.props.login(this.state);
    }
    toRegister = () => {
        this.props.history.replace('/register');
    }

    render() {
        const {msg, redirectTo} = this.props.user;
        if(redirectTo) {
            return <Redirect to={redirectTo} />
        }
        return (
            <div>
                <NavBar>产品AAA</NavBar>
                <WingBlank>
                    <Logo />
                    <List>
                        { msg? <div> {msg} </div> : null }
                        <WhiteSpace/>
                        <InputItem placeholder={"请输入用户名"} onChange={val=>{this.handleChange('username', val)}}>用户名</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder={"请输入密码"} type={'password'}  onChange={val=>{this.handleChange('password', val)}}>密&nbsp;&nbsp;码</InputItem>
                        <WhiteSpace/>
                        <Button type={'primary'} onClick={this.login}>登录</Button>
                        <WhiteSpace/>
                        <Button onClick={this.toRegister}>还没有账号</Button>

                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({ user:state.user }),
    {login}
)(Login);
