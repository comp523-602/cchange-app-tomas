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

var getBlankState = function () {
	return {
		items: [],
		loading: false,
		pageNumber: 0,
		exhausted: false,
		errorCount: 0
	};
};

class List extends Component {

	/**
	 * Creates initial state using props based to component, binds functions
	 * @memberof components/List#
	 */
	constructor (props) {
		super(props);
		this.state = getBlankState();
		this.pageObjects = this.pageObjects.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
		this.componentWillMount = this.componentWillMount.bind(this);
		this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
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
	 * Updates list with new props
	 * @memberof views/List#
	 */
	componentWillReceiveProps (props) {
		this.props = props;
		console.log(getBlankState());
		this.setState(getBlankState());
		console.log(this);
		this.pageObjects();
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

    	if (windowBottom >= docHeight && !this.state.exhausted && !this.state.loading) this.pageObjects();
	}

	/**
	 * Get a page of objects from server
	 * @memberof views/List#
	 */
	pageObjects () {

		console.log("page object this");
		console.log(this);

		// Don't allow loops of errors
		if (this.state.errorCount > 2) return;

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
		if (!request.sort) request.sort = "desc";
		if (!request.pageNumber) request.pageNumber = this.state.pageNumber;

		// Add dynamicParams to request
		if (config.dynamicParams) {
			if (config.dynamicParams.keyword && config.dynamicParams.keyword !== "") {
				request.keyword = config.dynamicParams.keyword;
			}
			if (config.dynamicParams.category) {
				request.category = config.dynamicParams.category;
			}
		}

		console.log(request);

		// Get items from server
		var self = this;
		Requests.makeRequest(config.address, request, function (error, body) {

			if (error) {
				var errorCount = self.state.errorCount + 1;
				self.setState({
					'loading': false,
					'errorCount': errorCount
				});
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
				{ !this.state.loading && !this.state.items.length ? <div className="row">Nothing to display</div> : null}
				{ this.state.items.length
					? this.state.items.map((item, index) => {
						if (item.objectType === "post") return <Post post={item} key={index}/>;
						if (item.objectType === "donation") return <Donation donation={item} key={index}/>;
						if (item.objectType === "campaign") return <Campaign campaign={item} key={index}/>;
						if (item.objectType === "charity") return <Charity charity={item} key={index}/>;
						if (item.objectType === "update") return <Update update={item} key={index}/>;
						if (item.objectType === "user") return <User user={item} key={index}/>;
						return null;
					})
					: null}
				{ this.state.loading ? <div className="row">Loading...</div> : null}
			</div>
		)
	}

	/**
	* Sorts list by date
	* @memberof components/List#
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
}

export default List;
