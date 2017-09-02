import React, {Component} from 'react';

class Comment extends Component{
	render(){
		return(
			<div>
			    <h6>{this.props.comment.username}:</h6>
			    <p>{this.props.comment.commentContent}</p>
			</div>
		)
	}
}
export default Comment