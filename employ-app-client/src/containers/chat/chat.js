import React, {Component} from 'react';
import { NavBar, List, InputItem } from 'antd-mobile';
import { connect } from 'react-redux';
import { sendMsg } from '../../redux/actions';

const Item = List.Item;

class Chat extends Component {

    state = {
        content: ''
    }

    handleSend = () => {
        const from = this.props.user._id;
        const to = this.props.match.params.userid;
        const content = this.state.content.trim(); // 发送前获取最新的内容, 指定 state 都需要手动创建监听。

        // 发送请求
        if( content ) {
            this.props.sendMsg({ from, to, content})
        }

        // 直接清除输入数据 // 问题在于如何获取
        // 这里 onChange ： 将 InputItem>value 更新到 content
        // 设置 value： 将 content 更新到 InputItem>value 中
        this.setState({ content: '' })

    }

    render() {
        const { user } = this.props;
        const { users, chatMsgs } = this.props.chat;

        const myId = user._id;
        const targetId = this.props.match.params.userid;

        const mychat_id = [myId, targetId].sort().join('_');
        const msgs= chatMsgs.filter( chatMsg => chatMsg.chat_id == mychat_id );

        // 找到对方头像, 如果对方资料未完善，就使用默认图片。
        let header = users[user._id].header;
        if(!header)
            header = 'o1';

        return (
            <div id={'chat-page'}>
                <NavBar>对话窗口</NavBar>
                <List>
                    {
                        msgs.map( msg => {
                            if( msg.to === myId ) { // 对方发送的消息

                                return (<Item
                                    key = {msg._id}
                                    thumb={ require(`../../assets/images/header/${header}.png`) }
                                >
                                    { msg.content }
                                </Item>);
                            } else { // 我发送的消息

                                return (<Item
                                    className={'chat-me'}
                                    extra={ '我' }
                                >
                                    { msg.content }
                                </Item>);
                            }
                        } )
                    }


                    <div className={'am-tab-bar'}>
                        <InputItem
                            placeholder={'请输入'}
                            value = {this.state.content}
                            onChange={ val => this.setState({ content: val }) }
                            extra = {
                                <span onClick={this.handleSend}>发送</span>
                            }
                        />
                    </div>
                </List>
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user, chat: state.chat }),
    { sendMsg }
)(Chat);
