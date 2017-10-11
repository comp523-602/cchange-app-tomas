/** @namespace modules/FieldConfigs */

var FieldConfigs = {

	/**
	 * @memberof modules/Fields
	 * @param {String} name Name of field
	 * @param {String} placeholder Placeholder for field
	 * @return {Object} Text field configuration object
	 */
	text: function (name, placeholder) {
		return {name: name, type: 'text', value: '', placeholder: placeholder}
	},

	/**
	 * @memberof modules/Fields
	 * @param {String} name Name of field
	 * @param {String} placeholder Placeholder for field
	 * @return {Object} Textarea field configuration object
	 */
	textarea: function (name, placeholder) {
		return {name: name, type: 'textarea', value: '', placeholder: placeholder};
	},

	/**
	 * @memberof modules/Fields
	 * @param {String} placeholder Placeholder for field
	 * @return {Object} Email field configuration object
	 */
	email: function (placeholder) {
		return {name: 'Email', type: 'email', value: '', placeholder: placeholder};
	},

	/**
	 * @memberof modules/Fields
	 * @param {String} placeholder Placeholder for field
	 * @return {Object} Password field configuration object
	 */
	password: function (placeholder) {
		return {name: 'Password', type: 'password', value: '', placeholder: placeholder};
	}
};

export default FieldConfigs;
