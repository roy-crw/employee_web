/**
 *@Date 2019/7/27
 *@author: roy
 *@function: 大神主界面
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import UserList from '../../components/user-list/user-list';
import {getUserList} from "../../redux/actions";


class Dashen extends Component {

    componentDidMount() {
        // 该操作会全局请求最新的 userList 数据。
        this.props.getUserList( 'laoban' )
    }

    render() {
        return (
            <div className={'userlist'}>
                <UserList userList={this.props.userList }/>
            </div>
        )
    }
}

export default connect(
    state => ({ userList: state.userList }),
    { getUserList }
)(Dashen);