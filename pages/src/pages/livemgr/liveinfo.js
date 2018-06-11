import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Button,
  Modal,
  Popconfirm,
  message,
  Form,
  Input,
  Row,
  Col,
  Icon
} from 'antd';
const FormItem = Form.Item;

import Radar from '@/pages/radar.js';
import Infrared from '@/pages/infrared.js'; 

class LivePlay extends React.Component {

  render() {

    const poster = `${ROOT_PATH}/video.jpeg`;
    return(
        <video style={{
          height : '100%',
          width : '100%',
        }} poster={poster} autoPlay={true}  src="http://common.qupai.me/player/qupai.mp4" controls="controls" >
        </video> 
    )
  }
}

export default class Liveinfo extends Component {

  render() {
    return (
      <div>
        <div style={{
          paddingBottom : "10px"
        }
        }>
        
        <Row type="flex" >
          <Col span={3} >
            <Row type="flex" >
              <img src="/chuang.png" style={{
                  weight : '25px',
                  height : '25px'
              }} />
            </Row>
          </Col>
          <Col span={21} >
            <Row type="flex" align="end">
              <span  style={{
                marginRight : "10px",
                color : "#1890ff"
              }}>
                <Icon type="link" style={{
                marginRight : "3px"
              }} />
                已连接
              </span>
              <span  style={{
                marginRight : "10px",
                color : "#faad14"
              }}>
                <Icon type="poweroff" style={{
                marginRight : "3px"
              }} />
                50%
              </span>

              <span  style={{
                marginRight : "10px"
              }}>
                <Icon type="environment-o" style={{
                marginRight : "3px"
              }} />
                N23°06′2.69″ E113°17′33.99″
              </span>
            </Row>
          </Col>
        </Row>
        </div>
        <Row>
          <Col span="16">
            <div style={{
              padding : '5px'
            }}>
            <LivePlay></LivePlay>
            </div>
          </Col>
          <Col span="8">
            <Row>
              <Col>
                <Radar />
              </Col>
            </Row>
            <Row>
              <Col>
                <Infrared />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    )
  }


  
  componentDidMount(){

  }

  static contextTypes = {
    store: PropTypes.object
  }; //指定子context的对象结构

  //构建子组件用到的context
  static childContextTypes = {
    router: PropTypes.object,
    store: PropTypes.object
  };

  getChildContext() {
    const {history, location, match, staticContext} = this.props;
    const {store} = this.context;
    return {
      router: {
        history: history,
        route: {
          location: location,
          match: match,
          staticContext: staticContext
        }
      },
      store: store
    }
  }
}
