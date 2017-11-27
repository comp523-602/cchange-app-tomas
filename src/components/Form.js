/** @namespace components/Form */

// Import dependencies
import React, { Component } from 'react';
import Field from './Field';
import Requests from './../modules/Requests';
import request from 'superagent';
import Validation from './../modules/Validation';
import Async from 'async';

class Form extends Component {

	/**
	 * Creates initial state using props based to component, binds functions
	 * @memberof components/Form#
	 */
	constructor (props) {
		super(props);
		this.state = {
			loading: false,
			buttonText: 'Submit',
			errorMessage: null,
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	/**
	 * Converts props fields object to array, renders view
	 * @memberof components/Form#
	 */
	render() {

		// Create array of Field components from referenced by key
		var fields = [];
		for (var key in this.props.form.fields) {
			fields.push(
				<Field field={this.props.form.fields[key]} key={key} ref={key} />
			);
		}
		// Render view
		return (
			<div className="row">
				<h2>{this.props.form.title}</h2>
				<form onSubmit={this.handleSubmit}>
					{fields}
					{ this.state.errorMessage
						? <div className="errorMessage">{this.state.errorMessage}</div>
						: null }
					<input type="submit" className="submit" value={this.state.buttonText} />
				</form>
			</div>
		);
  	}

	/**
	 * Updates state with loading indicators, builds request, makes request using modules/Requests, runs props.onSuccess if successful
	 * @memberof components/Form#
	 */
	handleSubmit(event) {

		// Get form from properties
		var form = this.props.form;

		// Prevent default action
		event.preventDefault();

		// Start loading
		this.setState({
			buttonText: 'Loading...',
		})

		// Validate form
		var error = Validation.getErrorsFromForm(this.refs);
		if (error) {
			this.setState({
				buttonText: 'Submit',
				errorMessage: error,
			})
			return;
		}

		// Initialize requst address
		var address = form.address;

		// Initialize request body
		var body = form.base(this.refs);

		// Save reference to component
		var self = this;

		// Synchronously setup request with images
		Async.waterfall([

			// Upload images if neccesary
			function (callback) {

				// If form contains images..
				if (form.images) {

					// Update state
					self.setState({buttonText: 'Uploading images...'});

					// Get image parameters object from form
					var imageParameters = form.images(self.refs);

					// Iterate through each key in image groups
					Async.eachOf(imageParameters, function (parameter, key, callback) {

						// Handle array of images
						if (parameter instanceof Array) {
							body[key] = [];
							Async.each(parameter, function (image, callback) {
								request.post('https://api.cloudinary.com/v1_1/cchange/image/upload')
									.field('upload_preset', 'kajpdwj4')
									.field('file', image)
									.end((err, response) => {
										if (response && response.body && response.body.secure_url) {
											body[key].push(response.body.secure_url);
										}
										callback(err);
									 });
							}, function (err) {
								callback(err);
							});
						}

						// Hangle single image
						else {
							request.post('https://api.cloudinary.com/v1_1/cchange/image/upload')
								.field('upload_preset', 'kajpdwj4')
								.field('file', parameter)
								.end((err, response) => {
									if (response && response.body && response.body.secure_url)
										body[key] = response.body.secure_url;
									callback(err);
								 });
						}

					}, function (err) {
						callback(err);
					});
				}

				else callback();
			},

			// Make request to cChnage server
			function (callback) {
				self.setState({buttonText: 'Loading...'});
				Requests.makeRequest(address, body, function (err, response) {
					callback(err, response);
				})
			}

		], function (err, response) {

			// Handle form after error
			if (error) {
				var errorMessage = 'An error occurred';
				if (response && response.message) errorMessage = response.message;
				self.setState({
					buttonText: 'Submit',
					errorMessage: errorMessage,
				});
			}

			// Handle success
			else {
				self.setState({
					buttonText: 'Submit',
					errorMessage: null,
				});
				if (self.props.onSuccess) self.props.onSuccess(response);
			}

		});
	}
}

export default Form;
