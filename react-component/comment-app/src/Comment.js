import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CommentInput from './CommentInput.js';
import CommentReplyInput from './CommentReplyInput.js';
import CommentList from './CommentList.js';

class Comment extends Component{
	constructor(){
		super();
		this.state = {
			createdTime:'',
			isReply:false,
			commentReplys:[]
		}
	}
	static propTypes = {
	    comment: PropTypes.object.isRequired,
	    onDeleteComment: PropTypes.func,
	    index: PropTypes.number
	  }
	componentWillMount(){
		this._updateCreatedTime();
		this._timer = setInterval(this._updateCreatedTime.bind(this),5000)
	}
	componentWillUnmount(){
		clearInterval(this._timer)
	}
	_updateCreatedTime(){
		const commentCreatedTime = this.props.comment.commentCreatedTime,
		      duration = ((+new Date())-commentCreatedTime)/1000,
		      durationConversion = Math.round(duration/60),
		      t = new Date(commentCreatedTime);
		this.setState({
			createdTime:duration>60? (durationConversion>60? `${t.toLocaleString()}`:`${durationConversion}分钟前`):`${Math.round(Math.max(duration, 1))}秒前`
		})
	}
	_getProcessedContent(content){
		return content
		    .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
	        .replace(/>/g, "&gt;")
	        .replace(/"/g, "&quot;")
	        .replace(/'/g, "&#039;")
	        .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
	}
	handleDeleteComment(){
		if(this.props.onDeleteComment){
			this.props.onDeleteComment(this.props.index)
		}
	}
	handleClickOnReply(){
		this.setState({
			isReply:!this.state.isReply
		})
	}
	handleCommentReply(commentReply){
		if(!commentReply.username) return alert('请输入用户名')
		if(!commentReply.commentContent) return alert('请输入评论内容')
		const commentReplys = this.state.commentReplys;
		commentReplys.push(commentReply); 
		this.setState({commentReplys})
	    console.log(commentReplys)
	}
	handleIsReply(isReply){
		console.log(isReply)
		this.setState({isReply:!this.state.isReply})
		console.log(this.state.isReply)
	}
	render(){
		const comment = this.props.comment;
		return(
			<div className = 'comment'>
			    <div className = 'comment-username'>{comment.username}:</div>
			    <p dangerouslySetInnerHTML = {{__html:this._getProcessedContent(comment.commentContent)}} />
			    <div className = 'comment-operation'>
			        <div className = 'comment-reply'>
			            <span onClick = {this.handleClickOnReply.bind(this)}>回复</span>			            
			        </div>
				    <div className = 'comment-detail'>
				        <span>{this.state.createdTime}</span>
					    <span className = 'comment-detail-separate'>|</span>
					    <span className = 'comment-delete' onClick = {this.handleDeleteComment.bind(this)}>删除</span>
				    </div>
			    </div>
			    <div>
			        {this.state.isReply? <CommentReplyInput isReply = {this.handleIsReply.bind(this)} onSubmit = {this.handleCommentReply.bind(this)} />:null}
			        <CommentList comments = {this.state.commentReplys} />
			    </div>
			</div>
		)
	}
}
export default Comment