
// Import dependencies
import RequestLibrary from 'request';

// Setup constants
const API = 'http://api.cchange.ga/';

var Requests = {
	makeRequest: function (address, body, callback) {

		// Setup request options
		var options = {
			'method': "POST",
			'url': API + address,
			'json': body,
		};

		// Make request
		RequestLibrary(options, function (error, response, body) {

			// Handle hard request errors
			if (error) return callback(true, {message: 'Internal error'});

			// Handle successful responses
			if (response.statusCode === 200) {
				return callback(false, body);
			}

			// Handle error responses
			else {
				return callback(true, body);
			}
		});

	},
};

export default Requests;