/** @namespace modules/FormConfigs */

import FieldConfigs from './FieldConfigs';

/*
form config object:
title: Name of form
fields: keyed object for form fields
address: string to append to API address
base: initial JSON to send to server as body
*/

var FormConfigs = {

	/**
	 * @memberof modules/Forms
	 * @return {Object} Signup form configuration object
	 */
	signup: function () {
		return {
			title: 'Sign up',
			fields: {
				name: FieldConfigs.text('Name'),
				email: FieldConfigs.email(),
				password: FieldConfigs.password(),
			},
			address: 'user.create',
			base: function (ref) {
				return {
					'name': ref.name.state.value,
					'email': ref.email.state.value,
					'password': ref.password.state.value,
				}
			},
			onSuccess: function () {

			}
		};
	},

	/**
	 * @memberof modules/Forms
	 * @return {Object} Login form configuration object
	 */
	login: function () {
		return {
			title: 'Log in',
			fields: {
				email: FieldConfigs.email(),
				password: FieldConfigs.password(),
			},
			address: 'user.login',
			base: function (ref) {
				return {
					'email': ref.email.state.value,
					'password': ref.password.state.value,
				}
			},
		};
	},

	/**
	 * @memberof modules/Forms
	 * @return {Object} Charity signup form configuration object
	 */
	charitySignup: function () {
		return {
			title: 'Create a new cChange charity',
			fields: {
				name: FieldConfigs.text('Your Name'),
				email: FieldConfigs.email(),
				password: FieldConfigs.password(),
				charityName: FieldConfigs.text('Charity Name'),
			},
			address: 'user.create.charity',
			base: function (ref) {
				return {
					'name': ref.name.state.value,
					'email': ref.email.state.value,
					'password': ref.password.state.value,
					'charityName': ref.charityName.state.value,
				}
			},
		};
	},

	/**
	 * @memberof modules/Forms
	 * @return {Object} Charity edit form configuration object
	 */
	charityEdit: function () {
		return {
			title: 'Edit charity',
			fields: {
				name: FieldConfigs.text('Name'),
				description: FieldConfigs.textarea('Description'),
			},
			address: 'charity.edit',
			base: function (ref) {
				return {
					'name': ref.name.state.value,
					'description': ref.description.state.value,
				}
			},
		};
	},

	/**
	 * @memberof modules/Forms
	 * @return {Object} Campaign edit/create form configuration object
	 */
	campaignEditCreate: function (title, address) {
		return {
			title: title,
			fields: {
				name: FieldConfigs.text('Name'),
				description: FieldConfigs.textarea('Description'),
			},
			address: 'charity.edit',
			base: function (ref) {
				return {
					'name': ref.name.state.value,
					'description': ref.description.state.value,
				}
			},
		};
	},
};

export default FormConfigs;