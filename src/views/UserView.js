
// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';

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

	}

	componentWillReceiveProps(newProps) {
		this.componentWillMount(newProps);
	}

	render() {
		return (
			<div className="container">
				<h1>User</h1>
			</div>
		);
  	}
}

export default UserView;
