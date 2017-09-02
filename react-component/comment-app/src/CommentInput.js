import React, {Component} from 'react';
import UsernameInput from './UsernameInput.js';
import ContentInput from './ContentInput.js';

class CommentInput extends Component{
	constructor(){
		super();
		this.state={
			username:'',
			commentContent:''
		}
	}
	handleSubmitOnUsername(username){
		this.setState({
			username:username
		})
	}
	handleSubmitOnCommentContent(commentContent){
		this.setState({
			commentContent:commentContent
		})
	}
	handleSubmit(){
		if(this.props.onSubmit){
			const {username,commentContent} = this.state;
			this.props.onSubmit({username,commentContent})
		}
		this.setState({
			commentContent:''
		})
	}
	render(){
		return(
			<div className = 'comment-input'>
			    <UsernameInput onSubmit = {this.handleSubmitOnUsername.bind(this)}/>
			    <ContentInput onSubmit = {this.handleSubmitOnCommentContent.bind(this)}/>
			    <button onClick = {this.handleSubmit.bind(this)}>发布</button>
			</div>
		)
	}
}
export default CommentInput;