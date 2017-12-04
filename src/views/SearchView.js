
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
						<List config={{address: 'campaigns', responseKey: 'campaigns'}} />
					</TabPanel>

					<TabPanel>
						<List config={{address: 'charities', responseKey: 'charities'}} />
					</TabPanel>

					<TabPanel>
						<List config={{address: 'updates', responseKey: 'updates'}} />
					</TabPanel>

					<TabPanel>
						<List config={{address: 'users', responseKey: 'users'}} />
					</TabPanel>

					<TabPanel>
						<List config={{address: 'posts', responseKey: 'posts'}} />
					</TabPanel>

					<TabPanel>
						<List config={{address: 'donations', responseKey: 'donations'}} />
					</TabPanel>
				</Tabs>
			</div>
		);
  	}
}

export default SearchView;
