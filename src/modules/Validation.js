/** @namespace modules/Validation */

var Validation = {

	/**
	 * @memberof modules/Validation
	 * @param {object} refs Object of fields referenced by Form
	 * @return {string} Error message if form is invalid, null if form is valid
	 */
	getErrorsFromForm: function (refs) {

		var passwordFields = [];
		var errors = [];

		for (var key in refs) {
			var ref = refs[key];
			var type = ref.props.field.type;

			if (type === 'password') passwordFields.push(ref);
		}

		if (passwordFields.length === 2) {
			if (!this.passwordMatch(passwordFields)) return "Passwords do not match";
		}

		return null;
	},

	/**
	 * @memberof modules/Validation
	 * @param {array} passwordFields Array of password field references
	 * @return {boolean} True if passwords match, false otherwise
	 */
	passwordMatch: function (passwordFields) {
		var password = passwordFields[0].state.value;
		var confirm = passwordFields[1].state.value;
		if (password === confirm) return true;
		return false;
	},
};

export default Validation;