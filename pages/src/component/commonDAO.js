import React from 'react';
import axios from 'axios';
import {Mapper, Collection} from 'js-data';
import PropTypes from 'prop-types';

//初始化axios实例 作为axios单例
const instance = axios.create({baseURL: 'http://robinluo.top/wechat-xdy/'});

export default class CommonDAO extends React.Component {

  static props = {
    DAO: '',
    primaryKey: []
  }

  AXIOS = instance;

  state = {
    getUrl: undefined,
    postUrl: undefined,
    deleteUrl: undefined,
    putUrl: undefined,
    data: [],
    metadata: []
  }

  //试图初始化
  componentWillMount() {
    const me = this;
    const {DAO, primaryKey} = this.props;
    const mapper = new Mapper({name: `${DAO}`})
    this.collection = new Collection([], {mapper});
    this.collection.on('all', () => {
      me.setState({data: this.collection.getAll()})
    })

    const url = `/restful/${DAO}/`;
    this.setState({
      getUrl: this.props.getUrl
        ? this.props.getUrl
        : url + "all/",
      postUrl: this.props.postUrl
        ? this.props.postUrl
        : url,
      deleteUrl: this.props.getUrl
        ? this.props.deleteUrl
        : url+"batch/",
      putUrl: this.props.getUrl
        ? this.props.putUrl
        : url
    });
  }

  data = () => {
    return this.state.data;
  }

  // 发送get请求获取数据
  get = function(data, onSuccess, onFail) {
    const me = this;
    let param = "";
    //处理参数
    if (data) {
      let datas = [];
      for (let key in data) {
        datas.push(encodeURI(key) + "=" + encodeURI(data[key]));
      }
      param = "?" + datas.join("&");
    }

    this.AXIOS.request({
      method: 'get',
      url: this.state.getUrl + param
    }).then(function(response) {
      console.log(response.data);
      me.collection.removeAll();
      me.collection.add(response.data);
      onSuccess && onSuccess.call(this, response.data);
    }).catch(function(err) {
      console.log(err);
      onFail && onFail.call(this, err);
    });
  }.bind(this)

  //上传数据
  post = function(data, onSuccess, onFail) {
    const me = this;
    this.AXIOS.request({method: 'post', url: this.state.postUrl, data: data}).then(function(response) {
      console.log(response);
      me.collection.add(response.data);
      onSuccess && onSuccess.call(this, response.data);
    }).catch(function(err) {
      console.log(err);
      onFail && onFail.call(this, err);
    });
  }.bind(this)

  //删除数据
  delete = function(id, onSuccess, onFail) {
    const me = this;
    this.AXIOS.request({
      method: 'delete',
      url: this.state.deleteUrl + `${id}`
    }).then(function(response) {
      console.log(response);
      me.collection.remove(id);
      onSuccess && onSuccess.call(this, response.data);
    }).catch(function(err) {
      console.log(err);
      onFail && onFail.call(this, err);
    });
  }.bind(this)

  //更新数据
  put = function(id, data, onSuccess, onFail) {
    const me = this;
    this.AXIOS.request({
      method: 'put',
      url: this.state.putUrl + `${id}`,
      data: data
    }).then(function(response) {
      console.log(response);
      me.collection.add(data);
      onSuccess && onSuccess.call(this, response.data);
    }).catch(function(err) {
      console.log(err);
      onFail && onFail.call(this, err);
    });
  }.bind(this)

  //不渲染任何界面
  render() {
    return (<div>
      {this.props.children}
    </div>)
  }

}
