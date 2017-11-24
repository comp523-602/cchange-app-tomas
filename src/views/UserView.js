
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
			'following': Authentication.getUser().followingUsers.indexOf(this.props.match.params.guid) > -1,
			'donationview': false,
			'postview': true,
			'postViewButton': "Change to Donation view",
			'donationViewButton': "Change to Post View"
		};
		this.follow = this.follow.bind(this);
		this.unfollow = this.unfollow.bind(this);
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
			console.log(user);
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

	/**
	 * Follows charity for User
	 * @memberof views/CharityView#
	 */
	 follow() {
		 console.log("called");
		 Requests.makeRequest('user.followUser', {
			 	'user': this.props.match.params.guid,
 			}, (error, body) => {
				console.log(body.user);
				var user = body.user;
				if (!user) return;
				this.setState({
					'following': true
				});
			})
	 }

	 /**
 	 * Unfollows user
 	 * @memberof views/UserView#
 	 */
	 unfollow() {
		 Requests.makeRequest('user.unfollowUser', {
			 	'user': this.props.match.params.guid,
 			}, (error, body) => {
				console.log(body.user);
				var user = body.user;
				if (!user) return;
				this.setState({
					'following': true
				});
			})
	 }

	render() {
		return (
			<div>
				
						{this.state.user
						?	<div className="container">
								<h1>{this.state.user.name}</h1>
								{ Authentication.status() === Authentication.USER && this.state.user.guid !== Authentication.getUser().guid
									? this.state.following
										? <button onClick={this.unfollow}>Unfollow</button>
										: <button onClick={this.follow}>Follow</button>
									: null }
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
