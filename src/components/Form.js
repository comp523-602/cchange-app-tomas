
// Import dependencies
import React, { Component } from 'react';

// Import components
import Field from './Field';

// Import modules
import Requests from './../modules/Requests';

class Form extends Component {

	constructor (props) {
		super(props);
		this.state = {
			loading: false,
			buttonText: 'Submit',
			errorMessage: null,
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	render() {

		// Create array of field objects from referenced by key
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
					{ this.state.errorMessage ? <div className="errorMessage">{this.state.errorMessage}</div> : null }
					<input type="submit" className="submit" value={this.state.buttonText} />
				</form>
			</div>
		);
  	}

	handleSubmit(event) {

		// Prevent default action
		event.preventDefault();

		// Start loading
		this.setState({
			buttonText: 'Loading...',
		})

		// Setup request
		var address = this.props.form.address;
		var body = this.props.form.base(this.refs);
		if (this.props.requestParms) {
			for (var key in this.props.requestParams) {
				body[key] = this.props.requestParams[key];
			}	
		}

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
