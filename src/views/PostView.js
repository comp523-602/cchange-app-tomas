/** @namespace views/PostView */

// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';
import Authentication from './../modules/Authentication';
import List from './../components/List';
import { Link } from 'react-router-dom';

class PostView extends Component {

	/**
	 * Creates initial state with null values
	 * @memberof views/PostView#
	 */
	constructor(props) {
		super(props)
		this.state = {
			'post': null,
		};
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

		// Get post from server
		Requests.makeRequest('list.single', {
			'type': "post",
			'guid': postGUID,
		}, (error, body) => {

			// Get charity from response
			var post = body.object;
			if (!post) return;

			// Add charity to state
			this.setState({
				'post': post,
				'editLink': '/postEdit/'+post.guid,
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
			<div className="container row">
				{ this.state.post && this.state.post.donations.length != null
					? (
						<div>
							<h2><Link to={"/user/" + this.state.post.user}>{this.state.post.userName+"'s"}</Link> post to
								<Link to={"/campaign/" + this.state.post.campaign}> {this.state.post.campaignName}</Link></h2>

							<h3>{this.state.post.caption}</h3>
							<img src={this.state.post.shareableImage} alt={this.state.post.caption} /><br />
							{Authentication.status() === Authentication.USER
								? <div onClick={this.donate}><button>Donate 5¢</button></div>
								: null}
							<br />
							<h4>{this.state.post.donations.length} donations</h4>
							<br />
						</div>
					)
					: <div className="loading">Loading...</div>}
				<List config={{address: 'list.type',
					params: {type: "donation", post: this.props.match.params.guid}}}/>
			</div>
		)
	  }
	  compare (a, b) {
		if (a.dateCreated < b.dateCreated) {
			return 1;
		}
		if(a.dateCreated > b.dateCreated) {
			return -1;
		}
		return 0;
	}
}



export default PostView;
