
// Import dependencies
import React, { Component } from 'react';
import Form from './../components/Form';

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
			'name': fields.password.state.value,
			'email': fields.email.state.value,
			'password': fields.password.state.value,
		};
	},
	onSuccess: function (response) {
		
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
