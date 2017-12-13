/** @namespace views/UserView */

// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';
import Authentication from './../modules/Authentication';
import Format from './../modules/Format';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import List from './../components/List';
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
				var user = body.profileUser;
				if (user) this.setState({
					'user': user
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
				var user = body.profileUser;
				if (user) this.setState({
					'user': user
				});
			})
	 }

	render() {
		return (
			<div>
				<div className="gray heading"><div className="container">
						{ this.state.user
							? (
								<div>
									{ this.state.user.picture
										? <img src={this.state.user.picture} alt={this.state.user.name} />
										: null}
									<h1>{this.state.user.name}</h1>
									{ this.state.user.bio
										? <h3>{this.state.user.bio}</h3>
										: null}
									<p>{this.state.user.name} has donated {Format.currency(this.state.user.totalDonationAmount)}</p>
									{ Authentication.status() === Authentication.USER
										&& this.state.user.guid !== Authentication.getUser().guid
										? this.state.user.currentUserFollows
											? <button onClick={this.unfollow}>Unfollow</button>
											: <button onClick={this.follow}>Follow</button>
										: (<div>
											<Link to={"/userEdit/"+this.state.user.guid}><button>Edit Profile</button></Link>
											<Link to="/userAddFunds/"><button>Add Funds</button></Link>
										</div>) }
								</div>
							)
							: <div className="loading">Loading...</div> }
						{ this.state.charity && this.state.user && Authentication.status() === Authentication.USER
							? <div>
									{ this.state.charity.currentUserFollows
										? <button onClick={this.unfollow}>Unfollow</button>
										: <button onClick={this.follow}>Follow</button> }
									<button onClick={this.donate}>Donate</button>
								</div>
							: null}
				</div></div>
				<Tabs>
					<div className="gray tabsection"><div className="container">
						<TabList>
							<Tab>Posts</Tab>
							<Tab>Donations</Tab>
							<Tab>Users Following</Tab>
							<Tab>Charities Following</Tab>
							<Tab>Followers</Tab>
						</TabList>
					</div></div>
					<div className="container">
						<TabPanel>
							<List config={{address: 'list.type',
								params: {type: "post", user: this.props.match.params.guid}}} />
						</TabPanel>
						<TabPanel>
							<List config={{address: 'list.type',
								params: {type: "donation", user: this.props.match.params.guid}}} />
						</TabPanel>
						<TabPanel>
							<List config={{address: 'list.following',
								params: {type: "user", user:this.props.match.params.guid}}} />
						</TabPanel>
						<TabPanel>
							<List config={{address: 'list.following',
								params: {type: "charity", user:this.props.match.params.guid}}} />
						</TabPanel>
						<TabPanel>
							<List config={{address: 'list.followers',
								params: {user:this.props.match.params.guid}}} />
						</TabPanel>
					</div>
				</Tabs>
			</div>
		)
	}
}

export default UserView;
