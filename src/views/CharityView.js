/** @namespace views/CharityView */

// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';
import { Link } from 'react-router-dom';
import Authentication from './../modules/Authentication';
import Campaign from './../components/Campaign';

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
			'profilepictureURL': null,
		};
	}

	/**
	 * Gets charity object, updates state with charity object
	 * @memberof views/CharityView#
	 */
	componentWillMount () {

		// Get charity GUID from props
		var charityGUID = this.props.match.params.guid;

		// Get charity from server
		Requests.makeRequest('charity', {
			'charity': charityGUID
		}, (error, body) => {

			// Get charity from response
			var charity = body.charity;
			if (!charity) return;

			// Add charity to state
			this.setState({
				'charity': charity,
				'editLink': '/charityEdit/'+charity.guid,
				'profilepictureURL': charity.logo,
			})
			console.log(this.state.charity)
			// TODO: finish campaign listing
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
							<img src={this.state.profilepictureURL}/>
						</div>
					)
					: <div className="loading">Loading...</div> }
				{ Authentication.getUser().charity === this.props.match.params.guid
					&& this.state.editLink
					? <div className="container">
							<Link to={{
							pathname: '/campaignCreate',
							state: { guid: this.props.match.params.guid }
								}}>Create a Campaign</Link>
							<Link to={this.state.editLink}>Edit charity</Link>
						</div>
					: null }
					{ this.state.charity && this.state.charity.campaigns
						? this.state.charity.campaigns.map((campaign, index) => {
								return <Campaign campaign={campaign} key={index}/>
							})
						: null}
			</div>

		)
  	}
}

export default CharityView;
