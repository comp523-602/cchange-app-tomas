/** @namespace modules/Validation */

var Validation = {

	/**
	 * @memberof modules/Validation
	 * @param {object} refs Object of fields referenced by Form
	 * @return {string} Error message if form is invalid, null if form is valid
	 */
	getErrorsFromForm: function (refs) {

		// Get password fields
		var passwordFields = [];
		// Get donation field
		var donationField;
		for (var key in refs) {
			var ref = refs[key];
			var type = ref.props.field.type;
			if (type === 'password') passwordFields.push(ref);
			if (type === 'donation') donationField = ref;
		}

		// Check password fields
		if (passwordFields.length === 2) {
			if (!this.passwordMatch(passwordFields)) return "Passwords do not match";
		}

		if (donationField) {
			if (!this.donationCheck(donationField)) return "Please enter a valid dollar amount";
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

	/**
	 * @memberof modules/Validation
	 * @param {ref} donationField donation field
	 * @return {boolean} True if dollar amount matches regex
	 */
	donationCheck: function (donationField) {
		if(donationField.state.value.match(/(^[0-9]+$)|(^\.[0-9]{2}$)|(^[0-9]+\.[0-9]{2}$)/)) {
			return true;}
		return false;
	}
};

export default Validation;
