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
			this.props.onSubmit({
				username:this.state.username,
				commentContent:this.state.commentContent,
				commentCreatedTime:+new Date()
			})
		}
		this.setState({
			commentContent:''
		})
	}
	render(){
		return(
			<div className = 'comment-input'>
			    <UsernameInput onSubmit = {this.handleSubmitOnUsername.bind(this)} />
			    <ContentInput commentContent = {this.state.commentContent} onSubmit = {this.handleSubmitOnCommentContent.bind(this)}/>
			    <button onClick = {this.handleSubmit.bind(this)}>发布</button>
			</div>
		)
	}
}
export default CommentInput;