
var Storage = {
	getAll: function () {

		// Get cookies
		var cookies = document.cookie;

		// Catch empty cookies
		if (cookies === "") return {};

		// Initialize cookie library
		var cookieLibrary = {};

		// Make cookie array
		var cookieArray = cookies.split(";");

		// Push cookies into library
		for (var i in cookieArray) {
			var cookie = cookieArray[i];
			var key, value;
			for (var j in cookie) {
				if (cookie[j] === "=") {
					key = cookie.substring(0,j).replace(' ','');
					value = cookie.substring((parseInt(j, 10)+1),cookie.length);
					break;
				}
			}
			cookieLibrary[key] = JSON.parse(value);
		}

		return cookieLibrary;

	},
	set: function (key, json) {

		// Convert json to value string
		var value = JSON.stringify(json);

		// Setup default expiration (3 days with hour buffer)
		var now = new Date().getTime();
		var expiration = new Date(now + 1000 * 60 * 60 * 23 * 3).toUTCString();

		// Add cookie
		document.cookie = key + "=" + value + "; expires=" + expiration + ";";
	},
	get: function (key) {
		var allCookies = this.getAll();
		return allCookies[key];
	},
	delete: function (key) {
		document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
	},
	clear: function () {
		var allCookies = this.getAll();
		for (var key in allCookies) this.delete(key);
	},
};

export default Storage;