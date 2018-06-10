import ReactDom from 'react-dom';
import React from 'react';
import {Router, Route, HashRouter, Switch, Redirect} from 'react-router-dom';
import {connect, Provider} from 'react-redux';
import {createStore} from 'redux';
import PropTypes from 'prop-types';
import Login from './login';
import Main from './pages/main';
import Radar from './pages/radar';
import Infrared from './pages/infrared';
import 'antd/dist/antd.less';
import '@/robin.css';

//创建store
const InitState = {};

const reducer = (state, newState) => {
  let mergeState = {};
  Object.assign(mergeState, state, newState);
  return mergeState;
};
const store = createStore(reducer, InitState);

//编写路由配置
class App extends React.Component {

  render() {
    const {store} = this.context;
    return (<HashRouter ref="route">
      <Switch>
        <Route path="/" render={(props) => {
            return (<Provider store={store} ><Login {...props} /></Provider>)
        }} exact={true}/>
        <Route path="/login" render={(props) => {
            return (<Provider store={store} ><Login {...props} /></Provider>)
        }}/>
        <Route path="/main" render={(props) => {
            return (<Provider store={store} ><Main {...props} /></Provider>)
        }}/>
        <Route path="/radar" render={(props) => {
            return (<Provider store={store} ><Radar {...props} /></Provider>)
        }}/>
        <Route path="/infrared" render={(props) => {
            return (<Provider store={store} ><Infrared {...props} /></Provider>)
        }}/>
      </Switch>
    </HashRouter>);
  }

  static contextTypes = {
    store: PropTypes.object
  }
}

ReactDom.render(<Provider store={store}>
  <App/>
</Provider>, document.getElementById('root'));
