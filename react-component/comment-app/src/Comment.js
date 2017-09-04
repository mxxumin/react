import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Comment extends Component{
	constructor(){
		super();
		this.state = {
			createdTime:''
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
		      duration = ((+new Date())-commentCreatedTime)/1000;
		this.setState({
			createdTime:duration>60? `${Math.round(duration/60)}分钟前`:`${Math.round(Math.max(duration,1))}秒前`
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
	render(){
		const comment = this.props.comment;
		return(
			<div className = 'comment'>
			    <div className = 'comment-username'>{comment.username}:</div>
			    <p dangerouslySetInnerHTML = {{__html:this._getProcessedContent(comment.commentContent)}} />
			    <div className = 'comment-detail'>
				    <span>{this.state.createdTime}</span>
				    <span className = 'comment-detail-separate'>|</span>
				    <span className = 'comment-delete' onClick = {this.handleDeleteComment.bind(this)}>删除</span>
			    </div>
			</div>
		)
	}
}
export default Comment