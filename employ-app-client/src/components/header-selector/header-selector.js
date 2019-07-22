/**
 *@Date 2019/7/21
 *@author: roy
 *@function: 选择用户头像 UI 组件
 */

import React, {Component} from 'react';
import {List, Grid} from 'antd-mobile';
import PropTypes from 'prop-types';

export default class HeaderSelector extends Component {

    static propTypes = { // 定义之后，下面可以进行使用这种属性
        setHeader: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            icon: ''
        }

        this.headerList =[];
        for( let i=1; i<11; i++) {
            this.headerList.push({
                text:'头像'+i,
                icon: require('../../assets/images/header/o'+`${i}.png`)
            })
        }
        /*this.headerList.push({
            text: '头像1',
            icon: require('')
        })*/
    }

    handleClick = ({text, icon}) =>{
        this.setState({
            icon,
            text
        })
        this.props.setHeader(text);
    }

    render() {
        const {icon} = this.state;
        let cssStyle = {width:'10%'}
        const listHeader = icon? (<span>已选择头像： &nbsp;&nbsp; <img style={cssStyle} src={icon} /> </span>) :"请选择头像";

        return (

            <List renderHeader={()=> listHeader}>
                <Grid data={this.headerList}
                      columnNum={5} onClick={this.handleClick}/>
            </List>

        )
    }
}



