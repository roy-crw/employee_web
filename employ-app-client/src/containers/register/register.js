/**
 *@Date 2019/7/9
 *@author: roy
 *@function: 注册路由组件
 */

import React, {Component} from 'react';
import {NavBar, List,WingBlank,WhiteSpace,InputItem,Radio,Button } from 'antd-mobile';
import Logo from '../../components/logo/logo';
import { connect } from 'react-redux';

import {Redirect} from 'react-router-dom';
import {register} from '../../redux/actions';
const ListItem = List.Item;

class Register extends Component {

    state = {
        username: '',
        password: '',
        password2: '',
        type: 'dashen'

    }
    handleChange = (name, val) => {
        this.setState({
            [name]:val
        })
    }
    register = () => {
        // console.log(this.state);
        this.props.register(this.state);
    }
    toLogin = () => {
        this.props.history.replace('/login');
    }

    render() {
        const {type} = this.state;
        const {msg, redirectTo} = this.props.user;
        if(redirectTo) {
            return <Redirect to={redirectTo}/>
        }

        return (
            <div>
                <NavBar>产品AAA</NavBar>
                <WingBlank>
                    <Logo />
                    <List>
                        { msg? <div className={'error-msg'}>{msg}</div>:null }
                        <WhiteSpace/>
                            <InputItem placeholder={"请输入用户名"} onChange={val=>{this.handleChange('username', val)}}>用户名</InputItem>
                        <WhiteSpace/>
                            <InputItem placeholder={"请输入密码"} type={'password'}  onChange={val=>{this.handleChange('password', val)}}>密&nbsp;&nbsp;码</InputItem>
                        <WhiteSpace/>
                            <InputItem placeholder={"请输入确认密码"} type={'password'}  onChange={val=>{this.handleChange('password2', val)}}>确认密码</InputItem>
                        <WhiteSpace/>
                        <ListItem>
                            <span>用户类型：</span>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={type==='dashen'} onChange={()=>{this.handleChange('type', 'dashen')}}>大神</Radio>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={type==='laoban'} onChange={()=>{this.handleChange('type', 'laoban')}}>老板</Radio>
                        </ListItem>
                        <WhiteSpace/>
                        <Button type={'primary'} onClick={this.register}>注册</Button>
                        <WhiteSpace/>
                        <Button onClick={this.toLogin}>已有账号？</Button>

                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user }),
    {register}
)(Register);
