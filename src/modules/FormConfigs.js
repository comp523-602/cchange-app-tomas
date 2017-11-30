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
			base: function (refs) {
				return {
					'name': refs.name.state.value,
					'email': refs.email.state.value,
					'password': refs.password.state.value,
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
			base: function (refs) {
				return {
					'email': refs.email.state.value,
					'password': refs.password.state.value,
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
			base: function (refs) {
				return {
					'name': refs.name.state.value,
					'email': refs.email.state.value,
					'password': refs.password.state.value,
					'charityName': refs.charityName.state.value,
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
				logo: FieldConfigs.singleImageCrop('Logo'),
			},
			address: 'charity.edit',
			base: function (refs) {
				return {
					'name': refs.name.state.value,
					'description': refs.description.state.value,
				}
			},
			images: function (refs) {
				return {
					'logo': refs.logo.refs.cropper.getCroppedCanvas().toDataURL(),
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
			title: GUID ? 'Edit campaign':'Create campaign',
			fields: {
				name: FieldConfigs.text('Name', 'Name your campaign'),
				description: FieldConfigs.textarea('Description', 'Enter a description'),
				pictures: FieldConfigs.multipleImage('Add Images'),
			},
			address: GUID ? 'campaign.edit':'campaign.create',
			base: function (refs) {
				var returnObject = {
					'name': refs.name.state.value,
					'description': refs.description.state.value,
				};
				if (GUID) returnObject.campaign = GUID;
				return returnObject;
			},
			images: function (refs) {
				return {
					'pictures': refs.pictures.state.value,
				};
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
				donation: FieldConfigs.number('Amount', 'Enter a dollar amount'),				
			},
			address: 'post.create',
			base: function (refs) {
				return {
					'caption': refs.caption.state.value,
					'campaign': campaignGUID,
					'amount': refs.donation.state.value
				}
			},
			images: function (refs) {
				return {
					'image': refs.image.refs.cropper.getCroppedCanvas().toDataURL(),
				};
			},
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
			base: function(refs) {
				return {
					'caption': refs.caption.state.value,
					'post': postGUID,
				}
			}
		}
	},

	/**
	 * @memberof modules/FormConfigs
	 * @param {String} GUID
	 * @return {Object} Donation form configuration object
	 */
	donation: function(name, type, GUID) {
		return {
			title: 'Donate to ' + name, //campaign or charity name is appended
			fields: {
				donation: FieldConfigs.number('Amount', 'Enter a dollar amount'),
			},
			address: 'donation.create',
			base: function(refs) {
				var body = {
					'amount': parseInt(refs.donation.state.value*100),
				};
				body[type] = GUID;
				return body;
			}
		}
	},
};

export default FormConfigs;
