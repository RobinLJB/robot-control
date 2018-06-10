import React from 'react';
import Websocket from 'react-websocket';

import Store from '../redux/redux';

/**
 * 	往websocket 添加发送消息方法
 * @param {Object} message
 */
Websocket.prototype.sendMessage = function(message) {
	let websocket = this.state.ws;
	websocket.send(message);
}

export default class Socket extends React.Component {

	state = {
		SOCKETURL: Store.getState().SOCKETURL
	}

	componentDidMount() {
		Store.dispatch({
			WS: this.refs.websocket
		})

	}

	componentWillUnmount() {
		Store.dispatch({
			WS: null
		})
	}
	/**
	 * websocket 信息处理器
	 *
	 */
	handleMsg(data) {
		console.log("websocket data " + data);
		let result = JSON.parse(data);
		if(result && result.type) {
			switch(result.type) {
				case "connect":
					this.handleConnect(result);
					break;
			}
		}

	}
	/**
	 *	处理连接信息
	 *  獲取了登陸二維碼并渲染到界面上
 	 */
	handleConnect(result) {
		const qrcode = result.qrcode;
		//记录sessionId
		Store.dispatch({
			qrcode:qrcode
		})
	}

	/**
	 * websocket 连上处理器
	 */
	handleOpen() {
		//		Config.socket = this.refs.websocket.state.ws
	}

	/**
	 * websocket 关闭处理器
	 */
	handleClose() {
		//		Config.socket = null;
	}

	render() {
		return(
			<Websocket ref="websocket" url={this.state.SOCKETURL}
              		onMessage={this.handleMsg.bind(this)}
              		onOpen={this.handleOpen.bind(this)}
              		onClose={this.handleClose.bind(this)}
              		reconnect={true}
              		debug={true}
              	/>
		);
	}
}
