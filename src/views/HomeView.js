
// Import dependencies
import React, { Component } from 'react';
import List from './../components/List';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class HomeView extends Component {

	render() {
		return (
			<div className="container row">
				<Tabs>
					<TabList>
						<Tab>Causes</Tab>
						<Tab>People</Tab>
					</TabList>
					<TabPanel>
						<List config={{address: 'list.causesFeed', responseKey: 'causesFeed'}} />
					</TabPanel>
					<TabPanel>
						<List config={{address: 'list.peopleFeed', responseKey: 'peopleFeed'}} />
					</TabPanel>
				</Tabs>
			</div>
		);
  	}
}

export default HomeView;
