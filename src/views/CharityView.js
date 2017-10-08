
// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';
import Form from './../components/Form';
import { Link } from 'react-router-dom';

class CharityView extends Component {

	constructor(props) {
		super(props)
		this.state = {
			'charity': {},
			'editLink': null,
		};
	}

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

			// Add charity to state
			self.setState({
				'charity': charity,
				'editLink': '/charityEdit/'+charity.guid,
			})
		})
	}

	render() {
		return (
			<div className="container row">
				<h1>{this.state.charity.name}</h1>
				<h2>{this.state.charity.description}</h2>
				{ this.state.editLink ? <Link to={this.state.editLink}>Edit charity</Link> : null }
			</div>

		)
  	}
}

export default CharityView;
