/** @namespace views/CampaignsView */

// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';
import Campaign from './../components/Campaign';

class CampaignsView extends Component {

	/**
	* Creates initial state with null values
	* @memberof views/CampaignsView#
	*/
	constructor(props) {
		super(props)
		this.state = {
			'campaigns': [],
			'pageSize': null,
		};
	}

	/**
	* Gets list of Campaigns
	* @memberof views/CampaignsView#
	*/
	componentWillMount() {
		//Get list of 10 campaigns from the server
		Requests.makeRequest('campaigns', {
			'pageSize' : 10,
			'sort': 'desc',
			'sortKey' : 'dateCreated'
		}, (error, body) => {
			this.setState({
				'campaigns': body.campaigns,
			});
		})
	}

	/**
	* Renders list of Campaigns
	* @memberof views/CampaignsView#
	*/
	render() {
		return (
			<div className="container">
				<h1 className="row">Campaigns</h1>
				{ this.state.campaigns[0]
					?  this.state.campaigns.map((campaign, index) => {
							return <Campaign campaign={campaign} key={index}/>
						})
					: <div className="loading">Loading...</div> }
			</div>
		);
	}
}

export default CampaignsView;
