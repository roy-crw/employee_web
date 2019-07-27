/**
 *@Date 2019/7/27
 *@author: roy
 *@function: 个人中心界面
 */

import React, {Component} from 'react';
import { Result, List, WhiteSpace, Button, Modal } from 'antd-mobile';
import { connect } from 'react-redux';
import {}  from '../../redux/actions';
import Cookies from 'js-cookie';

const Item = List.Item;
const Brief = Item.Brief;

class Personal extends Component {

    handlelogout = () => {
        // 对应弹窗标题, 弹窗提示内容
        Modal.alert('退出', '确认退出登录吗？', [
            {
                text: '取消',
                onPress: () => console.log('cancel')
            },{
                text: '确认',
                onPress: () => {
                    Cookies.remove('userid');
                }
            }
        ])

    }

    render() {
        const { username, type, header, company, post, salary,info } = this.props.user;

        return (
            <div>
                <Result
                    img={ <img src={require(`../../assets/images/header/o2.png`)} style={{width:50}} alt={"header"} /> }
                    title={username}
                    message={company}
                />
                <List renderHeader={ () => '相关信息' }>
                    <Item multipleItem >
                        <Brief>职位：{post}</Brief>
                        <Brief>简介：{info}</Brief>
                        <Brief>薪资：{salary}</Brief>
                    </Item>
                </List>
                <WhiteSpace/>
                <List>
                    <Button type={'warning'} onClick={this.handlelogout } >退出登录</Button>
                </List>
            </div>
        )
    }
}


export default  connect(
    state => ({ user: state.user }),
    { }
)(Personal);


