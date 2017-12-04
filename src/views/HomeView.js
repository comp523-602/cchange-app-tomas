
// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';
import List from './../components/List';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class HomeView extends Component {
	constructor(props) {
		super(props)
		this.state={
			'campaigns': [],
			'charities': [],
			'pageSize': null
		};
	}

	componentWillMount() {
		Requests.makeRequest('campaigns', {
			'pageSize': 10,
			'sort': 'asc',
			'sortKey': 'dateCreated'
		}, (error, body) => {
			this.setState({
				campaigns:body.campaigns
			})
		})

		Requests.makeRequest('charities', {
			'pageSize': 10,
			'sort': 'asc',
			'sortKey': 'dateCreated'
		}, (error, body) => {
			this.setState({
				charities: body.charities
			})
		})
	}

	render() {
		const causesConfig = {
			address: 'user.causesFeed',
			responseKey: 'causesFeed',
		};

		const peopleConfig = {
			address: 'user.peopleFeed',
			responseKey: 'peopleFeed',
		};

		return (
			<div className="container row">
				<h1>Home</h1>
				<Tabs>
					<TabList>
						<Tab>Causes</Tab>
						<Tab>People</Tab>
					</TabList>

					<TabPanel>
						<List config={causesConfig} />
					</TabPanel>
					<TabPanel>
						<List config={peopleConfig} />
					</TabPanel>
				</Tabs>
			</div>
		);
  	}
}

export default HomeView;
