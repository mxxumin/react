import React, {Component} from 'react';

class UsernameInput extends Component{
	constructor(){
		super();
		this.state = {
			username:''
		}
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
	render(){
		return(
			<div className = 'username-input'>
		        <span>用户名：</span>
		        <input value = {this.state.username} onChange = {this.handleChangeOnInput.bind(this)} />
		    </div>
		)
	}
}
export default UsernameInput