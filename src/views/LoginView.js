/** @namespace views/LoginView */

// Import dependencies
import React, { Component } from 'react';
import FormConfigs from './../modules/FormConfigs';
import Form from './../components/Form';
import Authentication from './../modules/Authentication';

class LoginView extends Component {

	/**
	 * Renders view
	 * @memberof views/LoginView#
	 */
	render() {

		return (
			<div className="container">
				<Form form={FormConfigs.login()} onSuccess={this.onSuccess} />
			</div>
		);
  	}

	onSuccess () {
		Authentication.goToLandingPage();
	}
}

export default LoginView;
