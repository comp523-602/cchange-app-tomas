
// Import dependencies
import React, { Component } from 'react';
import List from './../components/List';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class SearchView extends Component {

	render() {
		return (
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
		);
  	}
}

export default SearchView;
