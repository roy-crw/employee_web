/**
 *@Date 2019/7/27
 *@author: roy
 *@function: 消息主界面
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';

 class Message extends Component {
    render() {
        return (
            <div> Message </div>
        )
    }
}

export default connect(
    state => ({}),
    {  }
)(Message)

