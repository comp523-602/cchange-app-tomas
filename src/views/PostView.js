/** @namespace views/PostView */

// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';
import { Link } from 'react-router-dom';
import Authentication from './../modules/Authentication';
import Campaign from './../components/Campaign';
import Moment from 'moment';
import $ from 'jquery';
class PostView extends Component {

	/**
	 * Creates initial state with null values
	 * @memberof views/PostView#
	 */
	constructor(props) {
		super(props)
		this.state = {};
		this.donate = this.donate.bind(this);
	}

	/**
	 * Gets post object, updates state with post object
	 * @memberof views/PostView#
	 */
	componentWillMount (newProps) {

		// Get charity GUID from props
		var postGUID = null;
		if (newProps) postGUID = newProps.match.params.guid;
		else postGUID = this.props.match.params.guid;

		// Get charity from server
		Requests.makeRequest('post', {
			'post': postGUID
		}, (error, body) => {

			// Get charity from response
			var post = body.post;
			if (!post) return;

			// Add charity to state
			this.setState({
				'post': post,
				'editLink': '/postEdit/'+post.guid,
			})
		})

		// Get campaigns from server
		Requests.makeRequest('donations', {
			'post': postGUID
		}, (error, body) => {

			// Get charity from response
			var donations = body.donations;
			if (!donations || !donations.length) return;

			// Add charity to state
			this.setState({
				'donations': donations
			})
		})
	}

	componentWillReceiveProps(newProps) {
		this.componentWillMount(newProps);
	}

	/**
	 * Temporary donate function
	 * @memberof views/PostView#
	 */
	 donate(event) {

		 var self = this;
		 Requests.makeRequest('donation.create', {
			 'post': self.props.match.params.guid,
			 'amount': 5,
		 }, function (error, body) {
			 var donation = body.donation;
			 var post = body.post;
			 if (!donation || !post) return;
			 var donations = self.state.donations;
			 if (!donations) donations = [];
			 donations.push(donation);
			 self.setState({
				 'donations': donations,
				 'post': post
			 });
		 })

	 }

	/**
	 * Renders view
	 * @memberof views/PostView#
	 */
	render() {
		return (
			<div className="container">
				{ this.state.post && this.state.post.donations.length != null
					? (
						<div>
							<h1>{this.state.post.caption}</h1>
							<h3>{this.state.post.donations.length} donations</h3>
							<img src={this.state.post.shareableImage} alt={this.state.post.caption} /><br />
							{Authentication.status() === Authentication.USER 
								? <div onClick={this.donate}><button>Donate 5¢</button></div>
								: null}
							<br /><br />
						</div>
					)
					: <div className="loading">Loading...</div>}
				{ this.state.donations
					? (
						this.state.donations.sort(function (a, b) {return b.dateCreated-a.dateCreated}).map((donation, index) => {
							return <div className="donation" key={index}>
								{donation.amount} cents / {Moment(donation.dateCreated*1000).fromNow()}
							</div>
						})
					)
					: "" }
			</div>
		)
  	}
}

export default PostView;
