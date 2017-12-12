/** @namespace components/List */

// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';
import Post from './Post.js';
import Charity from './Charity.js';
import Campaign from './Campaign.js';
import Update from './Update.js';
import User from './User.js';
import Donation from './Donation.js';

class List extends Component {

	/**
	 * Creates initial state using props based to component, binds functions
	 * @memberof components/List#
	 */
	constructor (props) {
		super(props);
		this.state = {
			items: [],
			loading: false,
			pageNumber: 0,
			exhausted: false,
		};
		this.pageObjects = this.pageObjects.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
	}

	/**
	 * Pages first items initially
	 * @memberof views/List#
	 */
	componentWillMount (props) {
		if (this.state.items && !this.state.items.length) this.pageObjects();
	}

	/**
	 * Initializes scroll listener
	 * @memberof views/List#
	 */
	componentDidMount() {
    	window.addEventListener("scroll", this.handleScroll);
  	}

	/**
	 * Destroys scroll listener
	 * @memberof views/List#
	 */
	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
 	}

	/**
	 * Handles scrolling
	 * @memberof views/List#
	 */
	handleScroll() {
		const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
    	const body = document.body;
    	const html = document.documentElement;
    	const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
    	const windowBottom = windowHeight + window.pageYOffset;

    	if (windowBottom >= docHeight && !this.state.exhausted) this.pageObjects();
	}

	/**
	 * Get a page of objects from server
	 * @memberof views/List#
	 */
	pageObjects () {

		// Initialize config object
		var config = this.props.config;

		// Start loading sequence
		this.setState({
			loading: true,
		});

		// Setup request
		var request = {};
		if (config.params) request = config.params;

		// Add unprovided variables to request
		if (!request.pageSize) request.pageSize = 20;
		if (!request.sort) request.sort = "asc";
		if (!request.pageNumber) request.pageNumber = this.state.pageNumber;

		// Get items from server
		var self = this;
		Requests.makeRequest(config.address, request, function (error, body) {

			if (error) {
				self.setState({'loading': false});
				return;
			}

			// Get new items from response
			var newItems = body.objects;

			// Check if items have been exhausted
			if (newItems.length < request.pageSize) {
				self.setState({'exhausted': true});
			}

			// Get items from state
			var items = self.state.items;
			for (var i in newItems) items.push(newItems[i]);

			// Get current page number
			var currentPageNumber = self.state.pageNumber;

			// Update state
			self.setState({
				'items': items,
				'loading': false,
				'pageNumber': currentPageNumber + 1,
			});
		})

	}

	/**
	* Renders list
	* @memberof components/List#
	*/
	render() {
		return (
			<div className="list">
				{ this.state.loading ? <div>Loading...</div> : null}
				{ this.state.items.length
					? this.state.items.sort(this.compare).map((item, index) => {
						if (item.objectType === "post") return <Post post={item} key={index}/>;
						if (item.objectType === "donation") return <Donation donation={item} key={index}/>;
						if (item.objectType === "campaign") return <Campaign campaign={item} key={index}/>;
						if (item.objectType === "charity") return <Charity charity={item} key={index}/>;
						if (item.objectType === "update") return <Update update={item} key={index}/>;
						if (item.objectType === "user") return <User user={item} key={index}/>;
						return null;
					})
					: <div>No items</div>}
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

export default List;
