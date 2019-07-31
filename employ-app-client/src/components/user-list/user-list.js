/**
 *@Date 2019/7/28
 *@author: roy
 *@function: 用户列表显示组件
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

import { WingBlank, WhiteSpace, Card } from 'antd-mobile';
import {reqUserList} from "../../api";
const Header = Card.Header;
const Body = Card.Body;

class UserList extends Component {
    static propTypes = {
        userList: PropTypes.array.isRequired
    }

    render() {
        const { userList } = this.props;
        return (
            <WingBlank>
                {
                    userList.map( user => (
                        <div key={user._id}>
                            <WhiteSpace />
                            <Card onClick={ () => this.props.history.push(`/chat/${user._id}`) }>
                                <Header
                                    thumb={ require(`../../assets/images/header/o1.png`) }
                                    extra = { user.username }
                                />
                                <Body>
                                <div>职位：{ user.post }</div>
                                { user.company ? <div> 公司：{user.company} </div> : null }
                                { user.salary ? <div> 薪资：{user.salary} </div> : null }
                                { user.info ? <div> 简介：{user.salary} </div> : null }
                                </Body>
                            </Card>
                        </div>
                    ) )
                }
            </WingBlank>
        )
    }
}

export default withRouter(UserList);
