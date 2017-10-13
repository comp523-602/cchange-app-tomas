/** @namespace views/SignupView */

// Import dependencies
import React, { Component } from 'react';
import FormConfigs from './../modules/FormConfigs';
import Form from './../components/Form';
import Authentication from './../modules/Authentication';

class SignupView extends Component {

	/**
	 * Renders view
	 * @memberof views/SignupView#
	 */

	render() {
		return (
			<div className="container">
				<Form form={FormConfigs.signup()} onSuccess={this.onSuccess} />
			</div>
		);
  	}

	onSuccess () {
		Authentication.goToLandingPage()
	}
}

export default SignupView;
