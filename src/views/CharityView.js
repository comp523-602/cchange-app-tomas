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
			'campaigns': null,
		};
	}

	/**
	 * Gets charity object, updates state with charity object
	 * @memberof views/CharityView#
	 */
	componentWillMount (newProps) {

		// Get charity GUID from props
		var charityGUID = null;
		if (newProps) charityGUID = newProps.match.params.guid;
		else charityGUID = this.props.match.params.guid;

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
		})

		// Get campaigns from server
		Requests.makeRequest('campaigns', {
			'charity': charityGUID
		}, (error, body) => {

			// Get charity from response
			var campaigns = body.campaigns;
			if (!campaigns || !campaigns.length) return;

			// Add charity to state
			this.setState({
				'campaigns': campaigns
			})
		})
	}

	componentWillReceiveProps(newProps) {
		this.componentWillMount(newProps);
	}

	/**
	 * Renders view
	 * @memberof views/CharityView#
	 */
	render() {
		return (
			<div>
				<div className="heading">
					<div className="container">
						{ this.state.charity
							? (
								<div className="profileHeading">
									<img src={this.state.profilepictureURL} alt={this.state.charity.name} />
									<h1>{this.state.charity.name}</h1>
									<h2>{this.state.charity.description}</h2>
								</div>
							)
							: <div className="loading">Loading...</div> }
						{ Authentication.getUser().charity === this.props.match.params.guid
							&& this.state.editLink
							? <div className="editLinks">
									<Link to="/campaignCreate">Create a Campaign</Link>
									<Link to={this.state.editLink}>Edit charity</Link>
								</div>
							: null }
					</div>
				</div>
				<div className="container row">
					{ this.state.campaigns
						? this.state.campaigns.map((campaign, index) => {
							return <Campaign campaign={campaign} key={index}/>
						})
						: null}
				</div>
			</div>
		)
  	}
}

export default CharityView;
