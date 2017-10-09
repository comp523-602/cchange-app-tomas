/** @namespace modules/Requests */

// Import dependencies
import RequestLibrary from 'request';
import Authentication from './Authentication';

// Setup constants
const API = 'http://api.cchange.ga/';

var Requests = {

	/**
	 * Stores the user and token properties of a response from the server
	 * @memberof modules/Requests
	 * @param {String} address Endpoint to append to base API address (no slashes)
	 * @param {Object} body JSON object to send as POST request body
	 * @param {Function} callback Callback: function (error, body)
	 */
	makeRequest: function (address, body, callback) {

		// Setup request options
		var options = {
			'method': "POST",
			'url': API + address,
			'headers': {
				'Content-Type': "application/json",
			},
			'body': JSON.stringify(body),
		};

		// Attach token if provided
		var token = Authentication.getToken();
		if (token) options.headers['Authorization'] = token;

		// Make request
		RequestLibrary(options, function (error, response, body) {

			// Handle hard request errors
			if (error) return callback(true, {message: 'Internal error'});

			// Convert response body to JSON
			if (body) body = JSON.parse(body);

			// Handle successful responses
			if (response.statusCode === 200) {
				if (body.token) Authentication.handleAuthResponse(body);
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