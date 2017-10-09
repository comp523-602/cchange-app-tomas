/** @namespace views/LoginView */

// Import dependencies
import React, { Component } from 'react';
import Forms from './../modules/Forms';
import Form from './../components/Form';
import Authentication from './../modules/Authentication';

class LoginView extends Component {

	/**
	 * Creates initial state using Login form from Forms module
	 * @memberof views/LoginView#
	 */
	constructor (props) {
		super(props)
		this.state = {
			loginForm: Forms.login(),
		}
	}

	/**
	 * Renders view
	 * @memberof views/LoginView#
	 */
	render() {
		return (
			<div className="container">
				<Form form={this.state.loginForm} onSuccess={this.onSuccess} />
			</div>
		);
  	}

	/**
	 * Passed to components/Form to execute on successful request
	 * @memberof views/LoginView#
	 */
	onSuccess (response) {
		Authentication.goToLandingPage();
	}
}

export default LoginView;
