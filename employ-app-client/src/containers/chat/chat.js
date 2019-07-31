import React, {Component} from 'react';
import { NavBar, List, InputItem } from 'antd-mobile';
import { connect } from 'react-redux';

const Item = List.Item;

class Chat extends Component {
    render() {
        return (
            <div id={'chat-page'}>
                <NavBar>aa</NavBar>
                <List>
                    <Item
                        thumb={ require('../../assets/images/header/o1.png') }
                    >
                        您好
                    </Item>
                    <Item
                        thumb={ require('../../assets/images/header/o1.png') }
                    >
                        您好
                    </Item>
                    <Item
                        className={'chat-me'}
                        extra={ '我' }
                    >
                        你也好
                    </Item>
                    <Item
                        className={'chat-me'}
                        extra={ '我' }
                    >
                        你也好
                    </Item>

                    <div className={'am-tab-bar'}>
                        <InputItem
                            placeholder={'请输入'}
                            extra = {
                                <span>发送</span>
                            }
                        />
                    </div>
                </List>
            </div>
        )
    }
}

export default connect(
    state => ({}),
    {  }
)(Chat);
