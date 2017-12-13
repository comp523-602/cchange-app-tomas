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
		this.state = {
			'dirty': false,
			'showCategoryField': true,
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleTabSelect = this.handleTabSelect.bind(this);
	}

	/**
	 * Renders view
	 * @memberof views/SearchView#
	 */
	render() {
		return (
			<div>
				<div className="container">
					<form className="searchform" onSubmit={this.handleSubmit}>
						<Field field={FieldConfigs.text("Keyword", "Filter results by keyword")} ref="keyword" />
						{ this.state.showCategoryField
							? <Field field={FieldConfigs.categories("Category", "end")} ref="category" />
							: null }
						<input type="submit" className="submit" value="Search" />
					</form>
				</div>
				<div className="container row">
					<Tabs onSelect={this.handleTabSelect}>

						<TabList>
							<Tab>Campaigns</Tab>
							<Tab>Charities</Tab>
							<Tab>Updates</Tab>
							<Tab>Users</Tab>
							<Tab>Posts</Tab>
							<Tab>Donations</Tab>
						</TabList>

						<TabPanel>
							<List config={{address: 'list.type', params: {type: 'campaign'},
								dynamicParams:{keyword: this.state.keyword, category: this.state.category}}} />
						</TabPanel>

						<TabPanel>
							<List config={{address: 'list.type', params: {type: 'charity'},
								dynamicParams:{keyword: this.state.keyword, category: this.state.category}}} />
						</TabPanel>

						<TabPanel>
							<List config={{address: 'list.type', params: {type: 'update'},
								dynamicParams:{keyword: this.state.keyword}}} />
						</TabPanel>

						<TabPanel>
							<List config={{address: 'list.type', params: {type: 'user'},
								dynamicParams:{keyword: this.state.keyword}}} />
						</TabPanel>

						<TabPanel>
							<List config={{address: 'list.type', params: {type: 'post'},
								dynamicParams:{keyword: this.state.keyword, category: this.state.category}}} />
						</TabPanel>

						<TabPanel>
							<List config={{address: 'list.type', params: {type: 'donation'},
								dynamicParams:{keyword: this.state.keyword}}} />
						</TabPanel>
					</Tabs>
				</div>
			</div>
		);
  	}

	handleSubmit (event) {
		event.preventDefault();
		this.setState({
			'keyword': this.refs.keyword.state.value,
			'category': this.refs.category.state.value,
		});
	}

	handleTabSelect (index, lastIndex, event) {
		if (index === 2 || index === 3 || index === 5)
			this.setState({'showCategoryField': false});
		else this.setState({'showCategoryField': true});
	}
}

export default SearchView;
