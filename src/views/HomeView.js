
// Import dependencies
import React, { Component } from 'react';
import List from './../components/List';
import Authentication from './../modules/Authentication';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class HomeView extends Component {

	render() {
		var user = Authentication.getUser();
		return (
			<div>
				<Tabs>
					<div className="tabsection gray"><div className="container">
						<TabList>
							<Tab>{user ? "Causes You Follow" : "Recent Campaigns & Updates" }</Tab>
							<Tab>{user ? "People You Follow" : "Recent Posts & Donations" }</Tab>
						</TabList>
					</div></div>
					<div className="container">
						<TabPanel>
							<List config={{address: 'list.causesFeed'}} />
						</TabPanel>
						<TabPanel>
							<List config={{address: 'list.peopleFeed'}} />
						</TabPanel>
					</div>
				</Tabs>
			</div>
		);
  	}
}

export default HomeView;
