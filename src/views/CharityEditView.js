/** @namespace views/CharityEditView */

// Import dependencies
import React, { Component } from 'react';
import Forms from './../modules/Forms';
import Form from './../components/Form';
import Requests from './../modules/Requests';

class CharityEditView extends Component {

	/**
	 * Creates initial state using null values
	 * @memberof views/CharityEditView#
	 */
	constructor (props) {
		super(props);
		this.state = {
			charityEditFrom: null,
		};
		this.onSuccess = this.onSuccess.bind(this);
	}

	/**
	 * Gets charity object, updates state using charity object
	 * @memberof views/CharityEditView#
	 */
	componentWillMount () {

		// Get charity GUID from props
		var charityGUID = this.props.match.params.guid;

		// Make reference to this for use in callback
		var self = this;

		// Get charity from server
		Requests.makeRequest('charity', {
			'charity': charityGUID
		}, function (error, body) {

			// Get charity from response
			var charity = body.charity;
			if (!charity) return;

			// Setup charity edit form
			var charityEditForm = Forms.charityEdit();
			charityEditForm.fields.name.value = charity.name;
			charityEditForm.fields.description.value = charity.description;

			// Add charity to state
			self.setState({
				'charityEditForm': charityEditForm,
			})
		})
	}

	/**
	 * Renders view
	 * @memberof views/CharityEditView#
	 */
	render() {

		return (
			<div className="container">
				{ this.state.charityEditForm
					? <Form form={this.state.charityEditForm} onSuccess={this.onSuccess} />
					: null}
			</div>
		);
  	}

	/**
	 * Passed to components/Form to be executed on successful request
	 * @memberof views/CharityEditView#
	 */
	onSuccess (response) {
		window.location.href = '/charity/'+this.props.match.params.guid;
	}
}

export default CharityEditView;
