/**
 *@Date 2019/7/27
 *@author: roy
 *@function: 丢失 页面丢失 页面
 */

import React, {Component} from 'react';
import { Button } from 'antd-mobile';

 class NotFound extends Component {
    render() {
        return (
            <div>
                <div>
                    <h2>抱歉， 找不到该页面！</h2>
                    <Button
                        type={'primary'}
                        onClick={ () => this.props.history.replace("/") }
                    >
                        回到首页
                    </Button>
                </div>
            </div>
        )
    }
}

export default NotFound;
