
// Import dependencies
import React, { Component } from 'react';

const LOGOUT = "You've logged out";

class LogoutView extends Component {
	render() {
		return (
			<div className="container">
				<h1>{LOGOUT}</h1>
			</div>
		);
  	}
}

export default LogoutView;
