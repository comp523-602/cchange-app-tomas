
// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';
import { Link } from 'react-router-dom';
import Authentication from './../modules/Authentication';

class UserView extends Component {

	constructor(props) {
		super(props)
		this.state = {
			'user': null
		};
	}

	componentWillMount() {
		var userGUID = this.props.match.params.guid;
		console.log(Authentication.getUser());
		/** 
		Requests.makeRequest('user', {
			'user': userGUID
		}, (error, body) => {
		})
		*/
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
