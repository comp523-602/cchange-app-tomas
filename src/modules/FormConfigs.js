/** @namespace modules/FormConfigs */

import FieldConfigs from './FieldConfigs';
import Authentication from './../modules/Authentication';

/*
form config object:
title: Name of form
fields: keyed object for form fields
address: string to append to API address
base: initial JSON to send to server as body
*/

var FormConfigs = {

	/**
	 * @memberof modules/FormConfigs
	 * @return {Object} Signup form configuration object
	 */
	signup: function () {
		return {
			title: 'Sign up',
			fields: {
				name: FieldConfigs.text('Name', 'Enter your name'),
				email: FieldConfigs.email('Enter your email'),
				password: FieldConfigs.password('Enter your password', 'Must be 8 characters long, must contain both letters and numbers'),
				confirmPassword: FieldConfigs.password('Confirm your password'),
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
	 * @memberof modules/FormConfigs
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
	 * @memberof modules/FormConfigs
 	 * @param {String} token
	 * @return {Object} Charity signup form configuration object
	 */
	charitySignup: function (token) {
		return {
			title: 'Create a new cChange charity',
			fields: {
				name: FieldConfigs.text('Your Name', 'Enter your name'),
				email: FieldConfigs.email('Enter your email'),
				password: FieldConfigs.password('Enter your password', 'Must be 8 characters long, must contain both letters and numbers'),
				confirmPassword: FieldConfigs.password('Confirm your password'),
				charityName: FieldConfigs.text('Charity Name', "Enter your charity's name"),
			},
			address: 'user.create.charity',
			base: function (ref) {
				return {
					'name': ref.name.state.value,
					'email': ref.email.state.value,
					'password': ref.password.state.value,
					'charityName': ref.charityName.state.value,
					'charityToken': token,
				}
			},
		};
	},

	/**
	 * @memberof modules/FormConfigs
	 * @return {Object} Charity edit form configuration object
	 */
	charityEdit: function () {
		return {
			title: 'Edit charity',
			fields: {
				name: FieldConfigs.text('Name', 'Enter new charity name'),
				description: FieldConfigs.textarea('Description', 'Enter new charity description'),
				image: FieldConfigs.singleImageCrop('Logo'),
			},
			address: 'charity.edit',
			base: function (ref) {
				return {
					'name': ref.name.state.value,
					'description': ref.description.state.value,
					'logo': ref.image.state.value,
				}
			},
		};
	},
	
	/**
	 * @memberof modules/FormConfigs
	 * @return {Object} Campaign edit form configuration object
	 */
	campaignEdit: function(GUID) {
		return {
			title: 'Edit Campaign',
			fields: {
				name: FieldConfigs.text('Name', 'Enter new campaign name'),
				description: FieldConfigs.textarea('Description', 'Enter new campaign description'),
			},
			address: 'campaign.edit',
			base: function (ref) {
				return {
					'campaign': GUID,
					'name': ref.name.state.value,
					'description': ref.description.state.value,
				}
			},
		};
	},

	/**
	 * @memberof modules/FormConfigs
	 * @return {Object} Campaign creation or editing form configuration object
	 */
	campaignCreateEdit: function (GUID) {
		return {
			title: 'Edit campaign',
			fields: {
				name: FieldConfigs.text('Name', 'Enter new campaign name'),
				description: FieldConfigs.textarea('Description', 'Enter new campaign description'),
			},
			address: GUID ? 'campaign.edit':'campaign.create',
			base: function (ref) {
				var returnObject = {
					'name': ref.name.state.value,
					'description': ref.description.state.value,
				};
				if (GUID)
					returnObject['campaign'] = GUID;
				return returnObject;
			},
		};
	},

	/**
	 * @memberof modules/FormConfigs
	 * @param {String} campaignGUID
	 * @return {Object} Post creation form configuration object
	 */
	postCreate: function(campaignGUID) {
		return {
			title: 'Make a post for ', //campaign name is appended in ../views/PostCreateView.js
			fields: {
				caption: FieldConfigs.text('Caption', 'Enter a caption for your picture'),
				image: FieldConfigs.singleImageCrop('Image'),
			},
			address: 'post.create',
			base: function(ref) {
				return {
					'caption': ref.caption.state.value,
					'image': null,
					'campaign': campaignGUID,
				}
			}
		}
	},

	/**
	 * @memberof modules/FormConfigs
	 * @param {String} postGUID
	 * @return {Object} Post edit form configuration object
	 */
	postEdit: function(postGUID) {
		return {
			title: 'Edit your post',
			fields: {
				caption: FieldConfigs.text('Caption', 'Enter a caption for your picture'),
			},
			address: 'post.edit',
			base: function(ref) {
				return {
					'caption': ref.caption.state.value,
					'post': postGUID,
				}
			}
		}
	}
};

export default FormConfigs;
