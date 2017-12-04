/** @namespace views/UserView */

// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';
import Authentication from './../modules/Authentication';
import { Link } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import List from './../components/List';

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
		Requests.makeRequest('list.single', {
			'type': "user",
			'guid': userGUID
		}, (error, body) => {

			// Get user from response
			var user = body.object;
			if (!user) return;

			// Add user to state
			this.setState({
				'user': user,
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
							? <Link to={"/userFollowing/" + this.state.user.guid}><button className="followerViewBtn">See who you follow</button></Link>
							: <Link to={"/userFollowing/" + this.state.user.guid}><button className="followerViewBtn">See who {this.state.user.name} follows</button></Link>
						}

						{ Authentication.status() === Authentication.USER && this.state.user.guid === Authentication.getUser().guid
							? <Link to={"/userAddFunds"}><button className="addFundsBtn">Add funds</button></Link>
							: null
						}

						<h1>{this.state.user.name}</h1>
						<p id="totalDonationAmt">{this.state.user.name} has donated ${this.state.user.totalDonationAmount}</p>
						{ Authentication.status() === Authentication.USER && this.state.user.guid !== Authentication.getUser().guid
							? this.state.following
								? <button onClick={this.unfollow}>Unfollow</button>
								: <button onClick={this.follow}>Follow</button>
							: null
						}

						<Tabs>
							<TabList>
								<Tab>Posts</Tab>
								<Tab>Donations</Tab>
							</TabList>
							<TabPanel>
								<List config={{address: 'list.type', params: {type: "post", user: this.props.match.params.guid}}} />
							</TabPanel>
							<TabPanel>
								<List config={{address: 'list.type', params: {type: "donation", user: this.props.match.params.guid}}} />
							</TabPanel>
						</Tabs>


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
