/** @namespace components/Form */

// Import dependencies
import React, { Component } from 'react';
import Field from './Field';
import Requests from './../modules/Requests';
import Validation from './../modules/Validation';

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
		var address = this.props.form.address;

		// Initialize request body
		var body = this.props.form.base(this.refs);

		// Save reference to component
		var self = this;

		// Make request
		Requests.makeRequest(address, body, function (error, response) {
			if (error) {
				self.setState({
					buttonText: 'Submit',
					errorMessage: response.message,
				});
			} else {
				self.setState({
					buttonText: 'Submit',
					errorMessage: null,
				});
				if (self.props.onSuccess) self.props.onSuccess(response);
			}
		})
	}
}

export default Form;