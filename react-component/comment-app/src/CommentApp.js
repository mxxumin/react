import React, {Component} from 'react';
import CommentInput from './CommentInput.js';
import CommentList from './CommentList.js';

class CommentApp extends Component{
	constructor(){
		super();
		this.state = {
			comments:[]
		}
	}
	componentWillMount(){
		this._loadComments()
	}
	_loadComments(){
		let comments = localStorage.getItem('comments');
		if(comments){
			comments = JSON.parse(comments)
			this.setState({comments})
		}
	}
	_saveComments(comments){
		localStorage.setItem('comments', JSON.stringify(comments))
	}
	handleChangeOnSubmit(comment){
		if(!comment) return
		if(!comment.username) return alert('请输入用户名')
		if(!comment.commentContent) return alert('请输入评论内容')
		this.state.comments.push(comment);
		this.setState({
			comments:this.state.comments
		})
		this._saveComments(this.state.comments)
	}
	render(){
		return(
			<div className = 'wrapper'>
			    <CommentInput onSubmit = {this.handleChangeOnSubmit.bind(this)}/>
			    <CommentList comments = {this.state.comments} />
			</div>
		)
	}
}
export default CommentApp;