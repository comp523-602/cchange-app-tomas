
var Fields = {
	text: function (name) {
		return {name: name, type: 'text', value: ''};
	},
	textarea: function (name) {
		return {name: name, type: 'textarea', value: ''};
	},
	email: function () {
		return {name: 'Email', type: 'email', value: ''};
	},
	password: function () {
		return {name: 'Password', type: 'password', value: ''};
	},
};

var Forms = {
	signup: function () {
		return {
			title: 'Sign up',
			fields: {
				name: Fields.text('Name'),
				email: Fields.email(),
				password: Fields.password(),
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
	login: function () {
		return {
			title: 'Log in',
			fields: {
				email: Fields.email(),
				password: Fields.password(),
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
	charitySignup: function () {
		return {
			title: 'Create a new cChange charity',
			fields: {
				name: Fields.text('Your Name'),
				email: Fields.email(),
				password: Fields.password(),
				charityName: Fields.text('Charity Name'),
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
	charityEdit: function () {
		return {
			title: 'Edit charity',
			fields: {
				name: Fields.text('Name'),
				description: Fields.textarea('Description'),
			},
			address: 'charity.edit',
			base: function (ref) {
				return {
					'name': ref.name.state.value,
					'description': ref.description.state.value,
				}
			},
		};
	},
};

export default Forms;