
// Import dependencies
import React, { Component } from 'react';
import Form from './../components/Form';
import Authentication from './../modules/Authentication';

// Setup charitySignupForm
var charitySignupForm = {
	title: 'Create a new cChange charity',
	fields: {
		name: {
			type: 'text',
			name: 'Your Name',
			value: '',
		},
		email: {
			type: 'email',
			name: 'Email',
			value: '',
		},
		password: {
			key: 'password',
			type: 'password',
			name: 'Password',
			value: '',
		},
		charityName: {
			key: 'charityName',
			type: 'text',
			name: 'Charity Name',
			value: '',
		},
	},
	address: 'user.create.charity',
	body: function (fields) {
		var base = {
			'name': fields.name.state.value,
			'email': fields.email.state.value,
			'password': fields.password.state.value,
			'charityName': fields.charityName.state.value,
		};
		base.charityToken = this.charityToken;
		return base;
	},
	onSuccess: function (response) {
		Authentication.goToLandingPage();
	},
};

class CharitySignupView extends Component {
	render() {

		// Add charityToken to charitySignupForm from route parameters
		charitySignupForm.charityToken = this.props.match.params.charityToken;

		return (
			<div className="container">
				<Form form={charitySignupForm} />
			</div>
		);
  	}
}

export default CharitySignupView;
