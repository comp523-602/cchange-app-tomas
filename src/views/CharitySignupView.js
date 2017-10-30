/** @namespace views/CharitySignupView */

// Import dependencies
import React, { Component } from 'react';
import FormConfigs from './../modules/FormConfigs';
import Form from './../components/Form';
import Authentication from './../modules/Authentication';

class CharitySignupView extends Component {

	/**
	 * Creates initial state using Charity Signup form from Forms module
	 * @memberof views/CharitySignupView#
	 */
	constructor (props) {
		super(props);
		this.state = {
			'charitySignupForm': FormConfigs.charitySignup(this.props.match.params.charityToken),
		}
	}

	/**
	 * Renders view (passing route parameters to components/Form)
	 * @memberof views/CharitySignupView#
	 */
	render() {

		return (
			<div className="container">
				<Form form={this.state.charitySignupForm} onSuccess={this.onSuccess} />
			</div>
		);
  	}

	/**
	 * Passed to components/Form to execute on successful request
	 * @memberof views/CharitySignupView#
	 */
	onSuccess (response) {
		Authentication.goToLandingPage();
	}
}

export default CharitySignupView;
