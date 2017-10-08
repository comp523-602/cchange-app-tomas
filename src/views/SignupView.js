
// Import dependencies
import React, { Component } from 'react';
import Forms from './../modules/Forms';
import Form from './../components/Form';
import Authentication from './../modules/Authentication';

class SignupView extends Component {

	constructor (props) {
		super(props);
		this.state = {
			signupForm: Forms.signup(),
		};
	}

	render() {
		return (
			<div className="container">
				<Form form={this.state.signupForm} onSuccess={this.onSuccess} />
			</div>
		);
  	}

	onSuccess (response) {
		Authentication.goToLandingPage();
	}
}

export default SignupView;
