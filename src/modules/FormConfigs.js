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
				name: FieldConfigs.text('Name', 'Enter your name'),
				email: FieldConfigs.email('Enter your email'),
				password: FieldConfigs.password('Must contain at least 8 characters and 1 number'),
				// passwordVerify: FieldConfigs.password('')
			},
			address: 'user.create',
			base: function (ref) {
				return {
					'name': ref.name.state.value,
					'email': ref.email.state.value,
					'password': ref.password.state.value,
				}
			},
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
				email: FieldConfigs.email('Enter your email'),
				password: FieldConfigs.password('Enter your password'),
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
				name: FieldConfigs.text('Your Name', 'Enter your name'),
				email: FieldConfigs.email('Enter your email'),
				password: FieldConfigs.password('Must contain at least 8 characters and 1 number'),
				charityName: FieldConfigs.text('Charity Name', "Enter your charity's name"),
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
				name: FieldConfigs.text('Name', 'Enter new charity name'),
				description: FieldConfigs.textarea('Description', 'Enter new charity description'),
				image: FieldConfigs.singleImage('imageURL')
			},
			address: 'charity.edit',
			base: function (ref) {
				return {
					'name': ref.name.state.value,
					'description': ref.description.state.value,
					'image': ref.image.state.value
				}
			},
		};
	},

	/**
	 * @memberof modules/Forms
	 * @return {Object} Campaign create form configuration object
	 */
	campaignCreate: function () {
		return {
			title: 'Create campaign',
			fields: {
				name: FieldConfigs.text('Name', 'Enter campaign name'),
				description: FieldConfigs.textarea('Description', 'Enter campaign description'),
			},
			address: 'campaign.create',
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
	 * @return {Object} Campaign edit form configuration object
	 */
	campaignEdit: function () {
		return {
			title: 'Edit campaign',
			fields: {
				name: FieldConfigs.text('Name', 'Enter new campaign name'),
				description: FieldConfigs.textarea('Description', 'Enter new campaign description'),
			},
			address: 'campaign.edit',
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
