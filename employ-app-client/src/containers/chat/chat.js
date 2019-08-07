import React, {Component} from 'react';
import { NavBar, List, InputItem,Grid,Icon } from 'antd-mobile';
import { connect } from 'react-redux';
import { sendMsg } from '../../redux/actions';

const Item = List.Item;

class Chat extends Component {

    state = {
        content: '',
        isShow: false // 设置是否显示表情列表
    }

    componentWillMount() {
        // 初始化表情列表
        const emojis = ['☺','☺','☺','☺','☺','☺','☺','☺','☺','☺','☺','☺','☺',
            '☺','☺','☺','☺','☺','☺','☺','☺','☺','☺','☺','☺','☺',
            '☺','☺','☺','☺','☺','☺','☺','☺','☺','☺','☺','☺','☺'];
        this.emojis = emojis.map( emoji => ({ text: emoji }) );
    }

    componentDidMount() { // 重新进入/加载组件时
        window.scrollTo(0, document.body.scrollHeight);
    }

    componentDidUpdate() { // 组件内容更新后，react 中是被 setState 所调动之时
        window.scrollTo(0, document.body.scrollHeight);
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
        this.setState({
            content: '' ,
            isShow: false
        })

    }

    showBox = () => {
        const isShow = !this.state.isShow;
        this.setState({ isShow  })
        if( isShow ) {
            setTimeout( ()=> {
                window.dispatchEvent(new Event('resize'));  // 浏览器对象的原生对象派发
            } ,30)
        }
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
                <NavBar
                    icon={<Icon type={'left'} />}
                    className={'sticky-header'}
                    onLeftClick={ ()=> this.props.history.goBack() }
                    >{users[targetId].username}</NavBar>
                <List style = {{marginTop: 50, marginBottom: 50}} >
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
                            onFocus = { () => this.setState({ isShow: false }) }
                            extra = {
                                <span>
                                    <span onClick={this.showBox}>☺</span>
                                    <span onClick={this.handleSend}>发送</span>
                                </span>
                            }
                        />
                        { this.state.isShow ?
                            (<Grid
                            data={this.emojis}
                            columnNum = {8}
                            carouselMaxRow = {4}
                            isCarousel = {true}
                            onClick = { (item) => {
                                this.setState({ content: this.state.content + item.text })
                            } }
                        />)
                            : null }

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
