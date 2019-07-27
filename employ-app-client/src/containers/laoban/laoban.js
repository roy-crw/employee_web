/**
 *@Date 2019/7/27
 *@author: roy
 *@function: 老板主界面
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';


class Laoban extends Component {

    componentDidMount() {
        this.props.getUserList('dashen');
    }

    render() {
        return (
            <div>laoban</div>
        )
    }
}

export default connect(
    state => ({ userList: state.userList }),
    { getUserList }
)(Laoban);

