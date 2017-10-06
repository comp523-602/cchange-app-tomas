
// Import dependencies
import React, { Component } from 'react';
import Form from './../components/Form';
import Authentication from './../modules/Authentication';

var signupForm = {
	title: 'Sign Up',
	fields: {
		name: {
			type: 'text',
			name: 'Name',
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
	},
	address: 'user.create',
	body: function (fields) {
		return {
			'name': fields.name.state.value,
			'email': fields.email.state.value,
			'password': fields.password.state.value,
		};
	},
	onSuccess: function (response) {
		Authentication.goToLandingPage();
	},
};

class SignupView extends Component {
	render() {
		return (
			<div className="container">
				<Form form={signupForm} />
			</div>
		);
  	}
}

export default SignupView;
