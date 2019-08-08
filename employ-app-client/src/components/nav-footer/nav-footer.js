import React, {Component} from 'react';
import {TabBar} from 'antd-mobile';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';

const Item = TabBar.Item;

// withRoute()
// 能够在非路由组件中使用 路由库 的 api
class NavFooter extends Component {

    static propTypes = {
        navList:PropTypes.array.isRequired,
        unReadCount: PropTypes.number.isRequired
    }

    render() {
        let {navList, unReadCount} = this.props;

        navList = navList.filter( nav=> !nav.hide );

        const path = this.props.location.pathname;

        return (
            <TabBar classname={'am-tab-bar'}>
                {
                    navList.map( ( nav, index ) => (
                            <Item key={nav.path}
                                  title={nav.text}
                                  icon={{ uri: require(`../../assets/images/navigation/${nav.icon}.ico`) }}
                                  badge={ nav.path==='/message'?unReadCount:0 }
                                  selectedIcon={{ uri: require(`../../assets/images/navigation/${nav.icon}-se.ico`) }}
                                  selected={ path === nav.path }
                                  onPress = { () => {
                                      this.props.history.replace(nav.path)
                                  } }
                            />
                    ))
                }
            </TabBar>
        )
    }
}
// 向外暴露 withRouter() 包装之后产生的组件
// 其将会传入一些特殊的属性
export default withRouter(NavFooter);

