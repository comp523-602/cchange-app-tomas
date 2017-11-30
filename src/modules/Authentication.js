/** @namespace modules/Authentication */

// Import dependencies
import Storage from './Storage';

var Authentication = {

	VISITOR: "vistor",
	USER: "user",
	CHARITY: "charity",

	/**
	 * @memberof modules/Authentication
	 * @return {enum} Enumerated Authentication status
	 */
	status: function () {
		var user = Storage.get('user');
		if (!user) return this.VISITOR;
		if (user) {
			if (user.charity) return this.CHARITY;
			return this.USER;
		}
	},

	/**
	 * Returns user object
	 * @memberof modules/Authentication
	 * @return {Object} User object
	 */
	getUser: function () {
		return Storage.get('user');
	},

	/**
	 * Returns authentication token
	 * @memberof modules/Authentication
	 * @return {String} Authentication token
	 */
	getToken: function () {
		return Storage.get('token');
	},

	/**
	 * Clears Storage moduule, updates window.location to logout page
	 * @memberof modules/Authentication
	 */
	logout: function () {
		Storage.clear();
		window.location.href = "/logout";
	},

	/**
	 * Stores the user and token properties of a response from the server
	 * @memberof modules/Authentication
	 * @param {Object} body Server response
	 */
	handleAuthResponse: function (body) {
		Storage.set('token', body.token);
		Storage.set('user', body.user);
	},

	/**
	 * Updates window.location based on authentication status
	 * @memberof modules/Authentication
	 */
	goToLandingPage: function () {
		var user = this.getUser();
		if (this.status() === this.USER) {
			window.location.href = "/user/"+user.guid;
		} else if (this.status() === this.CHARITY) {
			window.location.href = '/charity/'+user.charity;
		} else {
			window.location.href = '/';
		}
	},

	/**
	 * Updates user object
	 * @memberof modules/authentication
	 */
	 updateUser: function (body) {
		 //console.log(body.user);
		 if (this.status() === this.USER && body.user.guid === this.getUser().guid)
		 	Storage.set('user', body.user);
	 },
};

export default Authentication;
