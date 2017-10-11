/** @namespace modules/FieldConfigs */

var FieldConfigs = {

	/**
	 * @memberof modules/Fields
	 * @param {String} name Name of field
	 * @return {Object} Text field configuration object
	 */
	text: function (name) {
		return {name: name, type: 'text', value: ''}
	},

	/**
	 * @memberof modules/Fields
	 * @param {String} name Name of field
	 * @return {Object} Textarea field configuration object
	 */
	textarea: function (name) {
		return {name: name, type: 'textarea', value: ''};
	},

	singleImage: function (name) {
		return {name: name, type: 'singleImage', value: ''};
	},

	/**
	 * @memberof modules/Fields
	 * @return {Object} Email field configuration object
	 */
	email: function () {
		return {name: 'Email', type: 'email', value: ''};
	},

	/**
	 * @memberof modules/Fields
	 * @return {Object} Password field configuration object
	 */
	password: function () {
		return {name: 'Password', type: 'password', value: ''};
	},
};

export default FieldConfigs;