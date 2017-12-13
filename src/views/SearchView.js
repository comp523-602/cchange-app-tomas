/** @namespace views/SearchView */

// Import dependencies
import React, { Component } from 'react';
import List from './../components/List';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import FieldConfigs from './../modules/FieldConfigs';
import Field from './../components/Field';

class SearchView extends Component {

	/**
	 * Creates initial state using props based to component, binds functions
	 * @memberof views/SearchView#
	 */
	constructor (props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	/**
	 * Renders view
	 * @memberof views/SearchView#
	 */
	render() {
		return (
			<div>
				<div className="container row">
					<form className="searchform" onSubmit={this.handleSubmit}>
						<Field field={FieldConfigs.text("Keyword", "Filter results by keyword")} ref="keyword" />
						<Field field={FieldConfigs.categories("Category", "end")} ref="category" />
						<input type="submit" className="submit" value="Search" />
					</form>
				</div>
				<div className="container row">
					<Tabs>

						<TabList>
							<Tab>Campaigns</Tab>
							<Tab>Charities</Tab>
							<Tab>Updates</Tab>
							<Tab>Users</Tab>
							<Tab>Posts</Tab>
							<Tab>Donations</Tab>
						</TabList>


						<TabPanel>
							<List config={{address: 'list.type', params: {type: 'campaign'}}} />
						</TabPanel>

						<TabPanel>
							<List config={{address: 'list.type', params: {type: 'charity'}}} />
						</TabPanel>

						<TabPanel>
							<List config={{address: 'list.type', params: {type: 'update'}}} />
						</TabPanel>

						<TabPanel>
							<List config={{address: 'list.type', params: {type: 'user'}}} />
						</TabPanel>

						<TabPanel>
							<List config={{address: 'list.type', params: {type: 'post'}}} />
						</TabPanel>

						<TabPanel>
							<List config={{address: 'list.type', params: {type: 'donation'}}} />
						</TabPanel>
					</Tabs>
				</div>
			</div>
		);
  	}

	handleSubmit (event) {

		// Prevent default action
		event.preventDefault();

		// Get values from form
		var keyword = this.refs.keyword.state.value;
		var category = this.refs.category.state.value;

	}
}

export default SearchView;
