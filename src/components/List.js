/** @namespace components/List */

// Import dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Requests from './../modules/Requests';
import Post from './Post.js';
import Charity from './Charity.js';
import Campaign from './Campaign.js';

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
		};
		this.pageObjects = this.pageObjects.bind(this);
	}

	/**
	 * Gets charity object, updates state with charity object
	 * @memberof views/CharityView#
	 */
	componentWillMount (props) {
		if (this.state.items && !this.state.items.length) this.pageObjects();
	}

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
		if (request.pageSize) request.pageSize = 20;
		if (request.sort) request.sort = "asc";
		if (request.pageNumber) request.pageNumber = this.state.pageNumber;

		// Get items from server
		var self = this;
		Requests.makeRequest(config.address, request, function (error, body) {

			// Get new items from response
			var newItems = body[config.responseKey];
			if (!newItems) return;

			// Get items from state
			var items = self.state.items;
			for (var i in newItems) items.push(newItems[i]);

			// Get current page number
			var currentPageNumber = self.state.pageNumber;

			// Add charity to state
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
				{ this.state.items.length
					? this.state.items.map((item, index) => {
						if (item.objectType == "post") return <Post post={item} key={index}/>;
						if (item.objectType == "campaign") return <Campaign campaign={item} key={index}/>;
						if (item.objectType == "charity") return <Charity charity={item} key={index}/>;
					})
					: null }
			</div>
		)
	}
}

export default List;
