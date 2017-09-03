import React, {Component} from 'react';

class ContentInput extends Component{
	constructor(){
		super();
		this.state = {
			commentContent:''
		}
	}
	componentDidMount(){
		this.textarea.focus()
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
		        <textarea 
		        ref = {(textarea) => {this.textarea = textarea}}
		        // 在组件中传入commentContent属性，判断属性值是否为空来显示评论内容，当点击“发布”按钮后，CommentInput组件中的handleSubmit事件会将commentContent属性值变为空。
		        value = {this.props.commentContent? this.state.commentContent:''} 
		        onChange = {this.handleChangeOnContent.bind(this)} />
		    </div>
		)
	}
}
export default ContentInput