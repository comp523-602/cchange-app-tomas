/** @namespace modules/FieldConfigs */

var FieldConfigs = {

	/**
	 * @memberof modules/FieldConfigs
	 * @param {String} name Name of field
	 * @param {String} placeholder Placeholder for field
	 * @return {Object} Text field configuration object
	 */
	text: function (name, placeholder) {
		return {name: name, type: 'text', value: '', placeholder: placeholder}
	},

	/**
	 * @memberof modules/FieldConfigs
	 * @param {String} name Name of field
	 * @param {String} placeholder Placeholder for field
	 * @return {Object} Textarea field configuration object
	 */
	textarea: function (name, placeholder) {
		return {name: name, type: 'textarea', value: '', placeholder: placeholder};
	},

	/**
	 * @memberof modules/FieldConfigs
	 * @param {String} name name of field
	 * @return {Object} Image upload field configuration object
	 */
	singleImage: function (name) {
		return {name: name, type: 'singleImage', value: null};
	},

	/**
	 * @memberof modules/FieldConfigs
	 * @param {String} name name of field
	 * @return {Object} Image upload field configuration object with cropping
	 */
	singleImageCrop: function (name) {
		return {name: name, type: 'singleImageCrop', value: null};
	},

	/**
	 * @memberof modules/FieldConfigs
	 * @param {String} placeholder Placeholder for field
	 * @return {Object} Email field configuration object
	 */
	email: function (placeholder) {
		return {name: 'Email', type: 'email', value: '', placeholder: placeholder};
	},

	/**
	 * @memberof modules/FieldConfigs
	 * @param {String} placeholder Placeholder for field
	 * @return {Object} Password field configuration object
	 */
	password: function (placeholder, instructions) {
		return {name: 'Password', type: 'password', value: '', placeholder: placeholder,
			instructions: instructions};
	}
};

export default FieldConfigs;
