import React, {Component} from 'react';

class UsernameInput extends Component{
	constructor(){
		super();
		this.state = {
			username:''
		}
	}
	componentWillMount(){
		this._loadUsername();
	}
	handleChangeOnInput(event){
		if(this.props.onSubmit){
		    const username = event.target.value
		    console.log(username)
			this.props.onSubmit(username)
		}
		this.setState({
			username:event.target.value
		})
	}
	handleBlurOnInput(event){
		this._saveUsernam(event.target.value)
	}
	_loadUsername(){
		const username = localStorage.getItem('username');
		if(username){
			this.setState({username})
		}
		if(this.props.onSubmit){
			this.props.onSubmit(username)
		}
		// 刷新页面时，componentWillMount方法会调用_loadUsername()函数来读取localStorage中的username，此时利用this.props.onSubmit将username返回到父组件中，这样从localStorage中读取的username不会因为没有输入而报错
	}
	_saveUsernam(username){
		localStorage.setItem('username',username)
	}
	render(){
		return(
			<div className = 'username-input'>
		        <span>用户名：</span>
		        <input 
		        value = {this.state.username} 
		        onChange = {this.handleChangeOnInput.bind(this)}
		        onBlur = {this.handleBlurOnInput.bind(this)} />
		    </div>
		)
	}
}
export default UsernameInput