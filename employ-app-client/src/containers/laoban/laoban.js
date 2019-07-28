/**
 *@Date 2019/7/27
 *@author: roy
 *@function: 老板主界面
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';
import UserList from '../../components/user-list/user-list';
import { getUserList } from '../../redux/actions'

class Laoban extends Component {

    componentDidMount() {
        // 该操作会全局请求最新的 userList 数据。
        this.props.getUserList( 'dashen' )
    }

    // 这里的请求，一开始会成为空的。 因为 state 的初始状态值为 空值。
    // 所以需要手动 请求数据。 所以在改组件进行 挂载是，就手动请求最新数据。
    render() {
        return (
            <div className={'userlist'}>
                <UserList userList={this.props.userList }/>
            </div>
        )
    }
}


// 对应 reducer 中的 userList 分支数据。
export default connect(
    state => ({ userList: state.userList }),
    { getUserList }
)(Laoban);

