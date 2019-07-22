/**
 *@Date 2019/7/21
 *@author: roy
 *@function: 老板页面的路由组件
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';
import HeaderSelector from '../../components/header-selector/header-selector';
import {Redirect} from 'react-router-dom';
import {updateUser} from '../../redux/actions';

class DashenInfo extends Component {

    state = {
        header: '', // 头像名称
        post: '',   // 职位
        info: '',   // 个人介绍
    }

    setHeader = (header) => {
        this.setState({
            header
        })
    }

    handleChange = (name, val) => {
        this.setState({
            [name]: val
        })
    }
    save = () => {
        console.log(this.state);
        this.props.updateUser(this.state);
    }

    render() {
        const { header, type } = this.props.user;
        if( header ) { // 信息完善
            // 重定向到 详细内容路径  /laoban
            const path = type === 'dashen' ? '/dashen' : '/laoban';
            return <Redirect to={path} />

        } else {
            return (
                <div>
                    <NavBar> 大神信息完善 </NavBar>
                    <HeaderSelector setHeader={this.setHeader}/>
                    <InputItem placeholder={'求职岗位'} onChange={(val)=>this.handleChange('post', val)}> 求职岗位： </InputItem>
                    <TextareaItem title={'个人介绍：'}
                                  rows={3} placeholder={'请输入'}  onChange={(val)=>this.handleChange('info', val)} />
                    <Button type={'primary'} onClick={this.save} > 保&nbsp;&nbsp;存 </Button>
                </div>
            )
        }
    }
}

export default connect(
    state => ({ user: state.user }),  // 这里的 state 参数是全局 store 中存储的 state 参数、状态树。
    { updateUser }
)(DashenInfo);




