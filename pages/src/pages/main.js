import React from 'react';
import {Helmet} from "react-helmet";
import {
  Avatar,
  Button,
  Layout,
  Row,
  Col,
  Form,
  Input,
  Menu,
  Icon
} from 'antd';
import {
  Router,
  Route,
  HashRouter,
  Switch,
  Redirect,
  Link
} from 'react-router-dom';
const {Header, Footer, Sider, Content} = Layout;
const ButtonGroup = Button.Group;
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import {connect, Provider} from 'react-redux';
import PropTypes from 'prop-types';
import Liveinfo from '@/pages/livemgr/liveinfo';

import electron from 'electron';




export default class Index extends React.Component {

  state = {
    collapsed : true,
    isRadarOn : false,
    isInfraredOn  : false,
    // radarWindow : null,
    // infraredWindow : null
  }

  render() {

    const {history, location, match, staticContext} = this.props;
    const {store} = this.context;
    return (<Layout style={{
        height: '100vh'
      }}>
      <Helmet>
                <meta charSet="utf-8" />
                <title>巡检机器人控制终端</title>
      </Helmet>
      <Sider
          onMouseEnter={()=>{

           this.setState({
            collapsed : false
           }) 
          }}

          onMouseLeave={()=>{

           this.setState({
            collapsed : true
           }) 
          }}

          trigger={null}
          collapsible
          collapsed={this.state.collapsed}

        >
          <Menu mode="inline" defaultSelectedKeys={['1']}>
            <SubMenu key="1" title={<span><Icon style={{
              color : '#1890ff'
            }} type="dashboard" /><span>运动控制</span></span>}>
                
                <Menu.Item key="sub11">
                  <ButtonGroup style={{
                    marginLeft : '-35px'
                  }}>
                    <Button>正常前进</Button>
                    <Button>慢速前进</Button>
                  </ButtonGroup>
                </Menu.Item>
                <Menu.Item key="sub12">
                  <ButtonGroup style={{
                    marginLeft : '-35px'
                  }}>
                    <Button>正常后退</Button>
                    <Button>慢速后退</Button>
                  </ButtonGroup>
                </Menu.Item>
                <Menu.Item key="sub16">
                  <Button style={{
                    marginLeft : '-35px'
                  }}>唤醒</Button>
                    <span  style={{
                      marginLeft : "10px",
                      color : "#1890ff"
                    }}>已唤醒
                    </span>
                </Menu.Item>
                <Menu.Item key="sub17">
                <Button style={{
                    marginLeft : '-35px'
                  }}>充电</Button><span  style={{
                  marginLeft : "10px",
                  color : "#faad14"
                }}>未充电</span><span  style={{
                  marginLeft : "10px",
                  color : "#faad14"
                }}>50%</span></Menu.Item>
            </SubMenu>
            <SubMenu key="2" title={<span><Icon style={{
              color : '#1890ff'
            }} type="tool" /><span>特殊控制</span></span>}>
                <Menu.Item key="sub21">悬臂 1 压紧</Menu.Item>
                <Menu.Item key="sub22">悬臂 1 放松</Menu.Item>
                <Menu.Item key="sub23">悬臂 2 压紧</Menu.Item>
                <Menu.Item key="sub24">悬臂 2 放松</Menu.Item>
            </SubMenu>
            <SubMenu key="3" title={<span><Icon style={{
              color : '#1890ff'
            }} type="video-camera" />
                <span>
                  <span>摄像监控</span>
                  <span  style={{
                      marginLeft : "10px",
                      color : "#1890ff"
                    }}>已打开
                    </span>
                </span>
                </span>}>
                <Menu.Item key="sub31">摄像头开</Menu.Item>
                <Menu.Item key="sub32">摄像头关</Menu.Item>
                <Menu.Item key="sub33">方向</Menu.Item>
                <Menu.Item key="sub34">亮度</Menu.Item>
                <Menu.Item key="sub35">变焦</Menu.Item>
                <Menu.Item key="sub36">聚焦</Menu.Item>
                <Menu.Item key="sub37">光圈</Menu.Item>
                <Menu.Item key="sub38">扫描</Menu.Item>
                <Menu.Item key="sub39">预置点</Menu.Item>
                <Menu.Item key="sub30">点间巡航</Menu.Item>
            </SubMenu>
            <SubMenu key="4" title={<span><Icon style={{
              color : '#1890ff'
            }} type="pie-chart" /><span><span>激光雷达</span>
                    <span  style={{
                      marginLeft : "10px",
                      color : this.state.isRadarOn?"#1890ff":"grey"
                    }}>{this.state.isRadarOn?"已打开":"已关闭"}
                    </span>
                    </span>
              </span>}>
               <Menu.Item key="sub41">
               <ButtonGroup style={{
                    marginLeft : '-35px'
                  }}>
                    <Button type={this.state.isRadarOn?"primary":"default" } onClick={this.onRadarButtonOnClick}>打&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;开</Button>
                    <Button type={this.state.isRadarOn?"default":"primary" } onClick={this.onRadarButtonOffClick}>关&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;闭</Button>
                  </ButtonGroup>
                </Menu.Item>
            </SubMenu>
            <SubMenu key="7" title={<span><Icon style={{
              color : '#1890ff'
            }} type="bulb" /><span><span>红外成像</span>
                    <span  style={{
                      marginLeft : "10px",
                      color : this.state.isInfraredOn?"#1890ff":"grey"
                    }}>{this.state.isInfraredOn?"已打开":"已关闭"}
                    </span>
                    </span>
            </span>}>
                <Menu.Item key="sub71">
                  <ButtonGroup style={{
                    marginLeft : '-35px'
                  }}> 
                    <Button type={this.state.isInfraredOn?"primary":"default" } onClick={this.onInfraredButtonOnClick}>打&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;开</Button>
                    <Button type={this.state.isInfraredOn?"default":"primary" } onClick={this.onInfraredButtonOffClick}>关&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;闭</Button>
                  </ButtonGroup>
                </Menu.Item>
                <Menu.Item key="sub72">云台控制</Menu.Item>
            </SubMenu>
            <SubMenu key="5" title={<span><Icon style={{
              color : '#1890ff'
            }} type="warning" /><span>看门狗控制</span></span>}>
                <Menu.Item key="sub51">打开看门狗控制</Menu.Item>
                <Menu.Item key="sub52">关闭看门狗控制</Menu.Item>
            </SubMenu>
            <SubMenu key="6" title={<span><Icon style={{
              color : '#1890ff'
            }} type="bell" /><span>喇叭控制</span></span>}>
                <Menu.Item key="sub61">打开喇叭</Menu.Item>
                <Menu.Item key="sub62">关闭喇叭</Menu.Item>
            </SubMenu>
            
            <Menu.Item key="8">
              <Icon style={{
                color : '#1890ff'
              }} type="cloud-download-o"  />
              <span>更新</span>
            </Menu.Item>
          </Menu>
        </Sider>
      <Layout>
        <Helmet>
          <meta charSet="utf-8"/>
          <title>巡检机器人控制终端</title>
        </Helmet>
        <Layout>
          <Content style={{
              backgroundColor: '#f0f2f5'
            }}>
            <Layout style={{
                height: '100vh'
              }}>
              <Content style={{
                  backgroundColor: '#fff',
                  padding: "15px"
                }}>
                <Route path="/main" render={(props) => {
                    return <Provider store={store}><Liveinfo {...props}/></Provider>
                  }} exact={true}/>
              </Content>
            </Layout>
          </Content>
        </Layout>
      </Layout>
    </Layout>)

  }

  onRadarButtonOnClick = function (){
       const me = this;
      // const BrowserWindow =  electron.remote.BrowserWindow;
      // if(this.state.isRadarOn){
      //   let win = this.state.radarWindow;
      //   if(win&&!win.isDestroyed()){
      //     win.focus();
      //   }
      // }else{
      // let win = new BrowserWindow({ title : '雷达成像',width: 400, height: 320 , alwaysOnTop : true , backgroundColor: '#2e2c29'})
      // win.on('close', function () { 
      //    win = null
      //    me.setState({
      //     isRadarOn: false,
      //     infraredWindow : null
      //   })
      // })
      // win.loadURL("http://localhost:8191/#/radar")
      this.setState({
        isRadarOn : true,
        // radarWindow : win
      })

      // win.show()
    // }
      
  }.bind(this)

  onRadarButtonOffClick = function (){
      this.setState({
        isRadarOn : false
      })
  }.bind(this)


 onInfraredButtonOnClick = function (){
      const me = this;
      // const BrowserWindow =  electron.remote.BrowserWindow;
      // if(this.state.isInfraredOn){
      //   let win = this.state.infraredWindow;
      //   if(win&&!win.isDestroyed()){
      //     win.focus();
      //   }
      // }else{
      // let win = new BrowserWindow({ title : '红外成像', width: 400, height: 320 , alwaysOnTop : true , backgroundColor: '#2e2c29'})
      // win.on('close', function () { 
      //   win = null ;
      //   me.setState({
      //     isInfraredOn: false,
      //     infraredWindow : null
      //   })
      // })
      // win.loadURL("http://localhost:8191/#/infrared")
      this.setState({
        isInfraredOn: true,
       // infraredWindow : win
      })
      // win.show()
    // }
  }.bind(this)

  onInfraredButtonOffClick = function (){
      this.setState({
        isInfraredOn : false
      })
       
  }.bind(this)

  componentWillUpdate(nextProps, nextState) {
        // if(this.state.isRadarOn&&!nextState.isRadarOn){
        //   if(this.state.radarWindow&&!this.state.radarWindow.isDestroyed()){
        //     try{
        //       this.state.radarWindow.close();
        //     }catch(e){
        //       console.log(e)
        //     }
        //   }
        // }

        // if(this.state.isInfraredOn&&!nextState.isInfraredOn){
        //   if(this.state.infraredWindow&&!this.state.infraredWindow.isDestroyed()){
        //     try{
        //       this.state.infraredWindow.close();
        //     }catch(e){
        //       console.log(e)
        //     }
        //   }
        // }
  }

  static contextTypes = {
    store: PropTypes.object
  }

  //指定子context的对象结构
  static childContextTypes = {
    router: PropTypes.object,
    store: PropTypes.object
  };
  //构建子组件用到的context
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
