/** @namespace views/SignupView */

// Import dependencies
import React, { Component } from 'react';
import Forms from './../modules/Forms';
import Form from './../components/Form';
import Authentication from './../modules/Authentication';

class SignupView extends Component {

	/**
	 * Creates initial state using Signup form from Forms module
	 * @memberof views/SignupView#
     */
	constructor (props) {
		super(props);
		this.state = {
			signupForm: Forms.signup(),
		};
	}

	/**
	 * Passed to components/Form to be executed on successful request
	 * @memberof views/SignupView#
	 * @param {Object} response Server response body
	 */
	onSuccess (response) {
		Authentication.goToLandingPage();
	}

	/**
	 * Renders view
	 * @memberof views/SignupView#
	 */
	render() {
		return (
			<div className="container">
				<Form form={this.state.signupForm} onSuccess={this.onSuccess} />
			</div>
		);
  	}
}

export default SignupView;
