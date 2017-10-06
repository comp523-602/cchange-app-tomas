
// Import dependencies
import React, { Component } from 'react';
import Form from './../components/Form';
import Authentication from './../modules/Authentication';

var loginView = {
	title: 'Log In',
	fields: {
		email: {
			key: 'email',
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
	address: 'user.login',
	body: function (fields) {
		return {
			'email': fields.email.state.value,
			'password': fields.password.state.value
		}
	},
	onSuccess: function (response) {
		Authentication.goToLandingPage();
	},
};

class LoginView extends Component {
	render() {
		return (
			<div className="container">
				<Form form={loginView} />
			</div>
		);
  	}
}

export default LoginView;
