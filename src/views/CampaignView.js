/** @namespace views/CampaignView */

// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';

class CampaignView extends Component {

	/**
	* Creates initial props
	* @memberof views/CampaignView#
	*/
	constructor(props) {
		super(props)
		this.state = {
			//TODO: edit charity
			'campaign': null,
			'editLink': null,
		};
	}

	/**
	* Gets campaign object, updates state with campaign object
	* @memberof views/CampaignView#
	*/
	componentWillMount(newProps) {

		// Get campaign GUID from props
		var campaignGUID = null;
		if (newProps) campaignGUID = newProps.match.params.guid;
		else campaignGUID = this.props.match.params.guid;

		// Get campaign from server
		Requests.makeRequest('campaign', {
			'campaign': campaignGUID
		}, (error, body) => {

			// Get campaign from response
			var campaign = body.campaign;
			if (!campaign) return;

			// Add campaign to state
			this.setState({
				'campaign': campaign,
			});
		})
	}

	componentWillReceiveProps(newProps) {
		this.componentWillMount(newProps);
	}

	render() {
		return (
			<div className="container row">
				{ this.state.campaign
					? <div className="container">
						<h1>{this.state.campaign.name}</h1>
						<p>{this.state.campaign.description}</p>
					</div>
					: <div className="loading">Loading...</div> }
			</div>
		);
  	}
}

export default CampaignView;
