
// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';
import Form from './../components/Form';

var editForm = {
	title: 'Edit charity',
	fields: {
		name: {
			type: 'text',
			name: 'Name',
			value: '',
		},
		description: {
			type: 'textarea',
			name: 'Description',
			value: '',
		},
	},
	address: 'charity.edit',
	body: function (fields) {
		return {
			'name': fields.name.state.value,
			'description': fields.description.state.value
		}
	},
	onSuccess: function (response) {
		window.location.reload();
	},
};

class CharityView extends Component {

	constructor(props) {
		super(props)
		this.state = {
			charity: {},
			editForm: null,
		};
	}

	componentWillMount () {
		var charityGUID = this.props.match.params.guid;
		var self = this;
		Requests.makeRequest('charity', {
			'charity': charityGUID
		}, function (error, body) {
			var charity = body.charity;
			if (!charity) return;
			editForm.fields.name.value = charity.name;
			editForm.fields.description.value = charity.description;
			self.setState({
				'charity': charity,
				'editForm': editForm,
			})
		})
	}

	render() {
		return (
			<div className="container row">
				<h1>{this.state.charity.name}</h1>
				<h2>{this.state.charity.description}</h2>
				{ this.state.editForm ? <Form form={this.state.editForm} /> : null }
			</div>

		)
  	}
}

export default CharityView;
