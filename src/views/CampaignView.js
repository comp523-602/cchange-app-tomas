/** @namespace views/CampaignView */

// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';
import Post from './../components/Post';
import FormConfigs from './../modules/FormConfigs';
import Form from './../components/Form';

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
			'posts': [],
			'makePostForm': null
		};
		this.onSuccess = this.onSuccess.bind(this);
		
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
			var makePostForm = FormConfigs.makePost();
			// Add campaign to state
			this.setState({
				'campaign': campaign,
				'makePostForm': makePostForm
			});
		})

		//Retrieve all posts made for this specific campaign
		Requests.makeRequest('posts', {
			'campaign': campaignGUID
		}, (error, body) => {
			var posts = body.posts;
			if(!posts) return;

			this.setState({
				'posts': body.posts
			});
		})
	}
	componentWillReceiveProps(newProps) {
		this.componentWillMount(newProps);
	}

	render() {
		var params = {
			'campaign': this.props.match.params.guid
		}
		return (
			<div>
				<div className="heading">
					{ this.state.campaign
						? <div className="profileHeading">
							<h1>{this.state.campaign.name}</h1>
							<p>{this.state.campaign.description}</p>							
						</div>
						: <div className="loading">Loading Campaign</div> }		
					{ this.state.makePostForm 
						? <Form form={this.state.makePostForm} onSuccess={this.onSuccess} requestParams={params}/>
						: <div className="loading">Uploading to campaign...</div>}

					{this.state.posts[0]
						?  this.state.posts.map((post, index) => {
							return <Post post={post} key={index}/>
						})
						: null }
				</div>
			</div>
		);
	}
	onSuccess (response) {
		console.log("success");
	}
	  
}

export default CampaignView;
