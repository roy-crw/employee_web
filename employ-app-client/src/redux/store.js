/**
 *@Date 2019/7/9
 *@author: roy
 *@function:
 */

import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import reducer from './reducer';

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)) );

