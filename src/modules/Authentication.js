
// Import dependencies
import Storage from './Storage';

var Authentication = {
	VISITOR: "vistor",
	USER: "user",
	CHARITY: "charity",
	status: function () {
		var user = Storage.get('user');
		if (!user) return this.VISITOR;
		if (user) {
			if (user.charity) return this.CHARITY;
			return this.USER;
		}
	},
	getUser: function () {
		return Storage.get('user');
	},
	getToken: function () {
		return Storage.get('token');
	},
	logout: function () {
		Storage.clear();
		window.location.href = "/logout";
	},
	handleAuthResponse: function (body) {
		Storage.set('token', body.token);
		Storage.set('user', body.user);
	},
	goToLandingPage: function () {
		var user = this.getUser();
		if (this.status() === this.USER) {
			window.location.href = "/user/"+user.guid;
		} else if (this.status() === this.CHARITY) {
			window.location.href = '/charity/'+user.charity;
		} else {
			window.location.href = '/';
		}
	}
};

export default Authentication;