/**
 *@Date 2019/7/27
 *@author: roy
 *@function: 消息主界面
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import { List, Badge } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

// 过滤数据源，返回最新的对话数据
function  getLastMsgs(chatMsgs, userid) {
    /*const chats = {};
    chatMsgs.forEach( msg => { //
        chats[msg._id] = msg;
    } )
    return chats;*/

    const lastMsgObj = {};
    chatMsgs.forEach( msg => {
        /* 对 msg 进行个体统计 */
        /* 每个 msg 只代表一个消息，而 unreadCount 是代表每组对话中，所未读的消息。 */
        msg.unReadCount = 0;
        if( msg.to === userid && !msg.read ) { // 发送给我，并且未读
            msg.unReadCount = 1; // 代表当前这个消息的状态
        } else {
            msg.unReadCount = 0;
        }

        const chatid = msg.chat_id;
        let lastMsg = lastMsgObj[chatid];

        if( !lastMsg ) {
            lastMsgObj[chatid] = msg;
        } else {
            // msg.unReadCount += lastMsgObj[msg.chatId]; // 替换前先累加上之前统计组中的未读消息数量。
            msg.unReadCount += lastMsg.unReadCount;
            if( msg.create_time > lastMsg.create_time ) { /* 需要不断比较最新消息的发生时间 */
                lastMsgObj[chatid] = msg;
            }

        }
    } )
    // debugger
    // 将 lastMsgObj 最新列表对象 转化为 数组
    const lastMsgs = Object.values( lastMsgObj );

    // 将 lastMsgs 按照对话发生的时间进行排序
    lastMsgs.sort( (m1, m2) => {  // 返回结果 <0 , 将 m1 放置在数组前面。结果 >0, 将 m2 放置在数组前面。
        return m2.create_time - m1.create_time;
    }  )

    return lastMsgs; // 按时间排序的 消息对话列表
}

 class Message extends Component {
    render() {
        const {user} = this.props;
        const {users, chatMsgs} = this.props.chat;

        // 只需要保留最新的对话数据
        const lastMsgs = getLastMsgs(chatMsgs, user._id);

        console.log(lastMsgs);


        return (
            <List>
                {/* extra 代表右边内容标签,Badge 代表未读消息标签，thumb代表左边logo 图片，
                arrow 设置箭头位置和方向， brief 表示摘要（第二行，消息内容）。 */}
                {
                    lastMsgs.map( msg => {
                        const targetId = msg.to === user._id? msg.from: msg.to;
                        const targetUser = users[targetId];
                        return (
                            <Item
                                extra={< Badge text={msg.unReadCount} />}
                                thumb={require(`../../assets/images/header/${targetUser.header}.png`)}
                                arrow={'horizontal'}
                                onClick={ ()=> this.props.history.push(`/chat/${targetId}`) }
                            >
                                {msg.content}
                                <Brief>{ targetUser.username }</Brief>
                            </Item>
                        )
                    } )
                }

            </List>
        )
    }
}

export default connect(
    state => ({ user: state.user, chat: state.chat }),
    {  }
)(Message)

