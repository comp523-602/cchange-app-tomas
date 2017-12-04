/** @namespace views/UserView */

// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';
import Post from './../components/Post';
import Authentication from './../modules/Authentication';
import { Link } from 'react-router-dom';

class UserView extends Component {

	constructor(props) {
		super(props)
		this.state = {
			'user': null,
			'posts': [],
			'following': Authentication.getUser()? Authentication.getUser().followingUsers.indexOf(this.props.match.params.guid) > -1 : null,
			'followerView': false,
			'followingList': [],
			'postView': true, //default

		};
		this._isMounted = true;
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
			}, function(){
				console.log(this.state.user.name);
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

	/**
	 * Follows charity for User
	 * @memberof views/CharityView#
	 */
	 follow() {
		 console.log("called");
		 Requests.makeRequest('user.followUser', {
			 	'user': this.props.match.params.guid,
 			}, (error, body) => {
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
						{ Authentication.status() === Authentication.USER && this.state.user.guid === Authentication.getUser().guid
							?<Link to={'/donationHistoryView/' + this.state.user.guid}><button className="donationHistorybtn">Your donation history</button></Link>
							:<Link to={'/donationHistoryView/' + this.state.user.guid}><button className="donationHistorybtn">{this.state.user.name}'s donation history</button></Link>
						}

						{ Authentication.status() === Authentication.USER && this.state.user.guid === Authentication.getUser().guid
							? <Link to={"/followingView/" + this.state.user.guid}><button className="followerViewBtn">See who you follow</button></Link>
							: <Link to={"/followingView/" + this.state.user.guid}><button className="followerViewBtn">See who {this.state.user.name} follows</button></Link>
						}

						{ Authentication.status() === Authentication.USER && this.state.user.guid === Authentication.getUser().guid
							? <Link to={"/addFundsView/" + this.state.user.guid}><button className="addFundsBtn">Add funds</button></Link>
							: null
						}

						<h1>{this.state.user.name}</h1>
						<p id="totalDonationAmt">{this.state.user.name} has donated ${/*this.state.user.totalDonationAmt*/} .</p>
						{ Authentication.status() === Authentication.USER && this.state.user.guid !== Authentication.getUser().guid
							? this.state.following
								? <button onClick={this.unfollow}>Unfollow</button>
								: <button onClick={this.follow}>Follow</button>
							: null
						}
						{this.state.posts[0]
							?	this.state.posts.sort(this.compare).map((post, index) => {
									return <Post post={post} key={index}/>
									})
							: null
						}
						</div>
					: <div className="loading">Loading...</div> }
			</div>
		);
	  }
	  /**
	 * Sorting function for campaign posts
	 * @memberof views/UserView#
	*/
	compare (a, b) {
		if (a.dateCreated < b.dateCreated) {
			return 1;
		}
		if(a.dateCreated > b.dateCreated) {
			return -1;
		}
		return 0;
	}
}

export default UserView;
