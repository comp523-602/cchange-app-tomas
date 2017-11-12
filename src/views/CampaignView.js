/** @namespace views/CampaignView */

// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';
import Post from './../components/Post';
import Authentication from './../modules/Authentication';
import { Link } from 'react-router-dom';
import FormConfigs from './../modules/FormConfigs';
import Form from './../components/Form';
import $ from 'jquery';

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
		};
		//this.onSuccess = this.onSuccess.bind(this);
		this.compare = this.compare.bind(this)
	}


	/**
	* Gets campaign object, updates state with campaign object
	* Also gets post objects made to this campaign
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
	/**
	 * Renders the campaign information and renders all of the posts made to this campaign
	 * @memberof views/CampaignView#
 	*/
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
						{ this.state.campaign && Authentication.status() == Authentication.CHARITY && Authentication.getUser().charity === this.state.campaign.charity
							?	<Link to={'/campaignEdit/' + this.props.match.params.guid} >
									<p className="campaignName">
										Edit {this.state.campaign.name}
									</p>
								</Link>
							: null}
						{ this.state.campaign && Authentication.status() == Authentication.USER
							? <div>
									<div className="donation">
										<Form form={FormConfigs.donation(this.state.campaign.name, 'campaign', this.props.match.params.guid)} onSuccess={this.onDonate} />
									</div>
									<Link to={'/postCreate/' + this.props.match.params.guid} >
											<p>Create a post for this campaign</p>
									</Link>
								</div>
							: null}
					{this.state.posts[0]
						?	this.state.posts.sort(this.compare).map((post, index) => {
							return <Post post={post} key={index}/>
						})
						: null }
				</div>
			</div>
		);
	}

	/**
	 * Sorting function for campaign posts
	 * @memberof views/CampaignView#
	*/
	compare (a, b) {
		if (a.dateCreated < b.dateCreated) {
			return 1;
		}
		if(a.dateCreated > b.dateCreated) {
			return -1;
		}
		return 0;
	}

	onSuccess (response) {
  	var posts = this.state.posts;
		posts.push(response.post)
		this.setState({
			posts: posts
 		});
	}

	/**
	* Passed to components/Form to be exeuted on successful request
	* @memberof views/CampaignView#
	*/
	onDonate (response) {
		 var amount = response.donation.amount;
		 $(".donation").append("<p>You just donated $" + amount + "!</p>");
	}
}

export default CampaignView;
