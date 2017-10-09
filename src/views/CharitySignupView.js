/** @namespace views/CharitySignupView */

// Import dependencies
import React, { Component } from 'react';
import Forms from './../modules/Forms';
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
			'charitySignupForm': Forms.charitySignup(),
		}
	}

	/**
	 * Renders view (passing route parameters to components/Form)
	 * @memberof views/CharitySignupView#
	 */
	render() {

		// Add charityToken to charitySignupForm from route parameters
		var params = {
			'charityToken': this.props.match.params.charityToken,
		};

		return (
			<div className="container">
				<Form form={this.state.charitySignupForm} onSuccess={this.onSuccess} requestParams={params} />
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
