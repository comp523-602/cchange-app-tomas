
// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';
import Post from './../components/Post';
import Authentication from './../modules/Authentication';

class UserView extends Component {

	constructor(props) {
		super(props)
		this.state = {
			'user': null,
			'posts': [],
		};
	}

	componentWillMount(newProps) {

		// Get user GUID from props
		var userGUID = null;
		if (newProps) userGUID = newProps.match.params.guid;
		else userGUID = this.props.match.params.guid;

		// Get user from server
		Requests.makeRequest('user', {
			'user': userGUID
		}, (error, body) => {

			// Get user from response
			var user = body.user;
			if (!user) return;

			// Add user to state
			this.setState({
				'user': user,
			});
		})

		Requests.makeRequest('posts', {
			'user': userGUID,
			'sortKey': 'dateCreated',
			'sort': 'desc',
		}, (error, body) => {
			var posts = body.posts;
			if(!posts) return;

			this.setState({
				'posts': posts
			});
		})

	}

	componentWillReceiveProps(newProps) {
		this.componentWillMount(newProps);
	}

	render() {
		return (
			<div>
				{this.state.user
					?	<div className="container">
							<h1>{this.state.user.name}</h1>
							{this.state.posts[0]
								?	this.state.posts.map((post, index) => {
									return <Post post={post} key={index}/>
								})
								: null }
						</div>
				: <div className="loading">Loading...</div> }
			</div>
		);
  	}
}

export default UserView;
