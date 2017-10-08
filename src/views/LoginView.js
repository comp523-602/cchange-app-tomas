
// Import dependencies
import React, { Component } from 'react';
import Forms from './../modules/Forms';
import Form from './../components/Form';
import Authentication from './../modules/Authentication';

class LoginView extends Component {

	constructor (props) {
		super(props)
		this.state = {
			loginForm: Forms.login(),
		}
	}

	render() {
		return (
			<div className="container">
				<Form form={this.state.loginForm} onSuccess={this.onSuccess} />
			</div>
		);
  	}

	onSuccess (response) {
		Authentication.goToLandingPage();
	}
}

export default LoginView;
