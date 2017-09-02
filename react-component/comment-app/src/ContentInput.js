import React, {Component} from 'react';

class ContentInput extends Component{
	constructor(){
		super();
		this.state = {
			commentContent:''
		}
	}
	handleChangeOnContent(event){
		this.setState({
			commentContent:event.target.value
		})
		if(this.props.onSubmit){
		    const commentContent = event.target.value;
		    console.log(commentContent)
			this.props.onSubmit(commentContent)
		}
	}
	render(){
		return(
			<div className = 'content-input'>
		        <span>评论内容：</span>
		        <textarea value = {this.state.commentContent} onChange = {this.handleChangeOnContent.bind(this)}/>
		    </div>
		)
	}
}
export default ContentInput