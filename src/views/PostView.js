
// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';

class PostView extends Component {

	constructor(props) {
		super(props)
		this.state = {
			'post': null
		};
	}

	componentWillMount(newProps) {

		// Get post GUID from props
		var postGUID = null;
		if (newProps) postGUID = newProps.match.params.guid;
		else postGUID = this.props.match.params.guid;

		// Get user from server
		Requests.makeRequest('post', {
			'post': postGUID
		}, (error, body) => {

			// Get post from response
			var post = body.post;
			if (!post) return;

			// Add post to state
			this.setState({
				'post': post,
			});
		})

	}

	componentWillReceiveProps(newProps) {
		this.componentWillMount(newProps);
	}

	render() {
		return (
			<div className="container">
				<h1>Post</h1>
			</div>
		);
  	}
}

export default PostView;
