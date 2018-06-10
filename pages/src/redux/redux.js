import { createStore } from 'redux';

/**
 * 该对象用作初始化页面信息  store变量全为大写
 */


const InitState = {
    USERID: undefined,
    OPENID: '-1',
    NAME: '匿名用户',
    HEADPIC: 'head.png',
    SOCKETURL: 'ws:robinluo.top/wechat-xdy/admin',
    WS: null
};

const reducer = (state, newState) => {
    let mergeState = {};
    Object.assign(mergeState, state, newState);
    return mergeState;
};

const Store = createStore(reducer, InitState);

const dispatch = function(config){
  //設置默認事件類型為All
  let newConfig = Object.assign({type : "ALL",}, config)
  Store.dispatch(newConfig);
}

//订阅方法执行后  返回的结果  是一个取消的订阅的方法
const subscribe = Store.subscribe;

Store.InitState = InitState;

export {
    InitState,
    dispatch,
    subscribe
};

export default Store;
