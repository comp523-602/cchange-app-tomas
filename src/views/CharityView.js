/** @namespace views/CharityView */

// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';
import { Link } from 'react-router-dom';
import Authentication from './../modules/Authentication';

class CharityView extends Component {

	/**
	 * Creates initial state with null values
	 * @memberof views/CharityView#
	 */
	constructor(props) {
		super(props)
		this.state = {
			'charity': null,
			'editLink': null,
		};
	}

	/**
	 * Gets charity object, updates state with charity object
	 * @memberof views/CharityView#
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

			// Add charity to state
			self.setState({
				'charity': charity,
				'editLink': '/charityEdit/'+charity.guid,
			})
		})
	}

	/**
	 * Renders view
	 * @memberof views/CharityView#
	 */
	render() {
		return (
			<div className="container row">
				{ this.state.charity
					? (
						<div className="objectHeader">
							<h1>{this.state.charity.name}</h1>
							<h2>{this.state.charity.description}</h2>
						</div>
					)
					: <div className="loading">Loading...</div> }
				{ this.state.editLink
					? <Link to={this.state.editLink}>Edit charity</Link>
					: null }
				{ Authentication.getUser().charity === this.props.match.params.guid
					? <button type="button">Create a Campaign</button>
					: null }
			</div>

		)
  	}
}

export default CharityView;
