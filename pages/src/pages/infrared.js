import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Helmet} from "react-helmet";


class LivePlay extends React.Component {

  render() {
    const poster = `${ROOT_PATH}/infrared.jpg`;
    return(
        <video style={{
          height : '100%',
          width : '100%',
        }} poster={poster} autoPlay={true}  src="http://common.qupai.me/player/qupai.mp4" controls="controls" >
        </video> 
    )
  }
}

/**<!--<Helmet>
  *         <meta charSet="utf-8" />
  *        <title>红外成像</title>
  *  </Helmet>-->
  */
export default class Infrared extends Component {

  render() {
    return (

      <div style={{
        padding : '5px'
      }}>
        
        <LivePlay></LivePlay>
      </div>
    )
  }


  
  componentDidMount(){

  }

  static contextTypes = {
    store: PropTypes.object
  }; 

  //指定子context的对象结构

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
