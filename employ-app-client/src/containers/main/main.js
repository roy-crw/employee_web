/**
 *@Date 2019/7/9
 *@author: roy
 *@function: 主界面路由组件
 */

import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import LaobanInfo from '../laoban-info/laoban-info';
import DashenInfo from '../dashen-info/dashen-info';
import {connect} from 'react-redux';


class Main extends Component {

    render() {
        const {user} = this.props;
        if( !user._id ) {  // 未登陆重新跳转
            return <Redirect to={'/login'}/>
        }

        return (
            <div>
                <Switch>
                    <Route path={'/laobaninfo'} component={LaobanInfo} />
                    <Route path={'/dasheninfo'} component={DashenInfo} />
                </Switch>
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user }),
    {}
)(Main);