
// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';
import Campaign from './../components/Campaign';
import Charity from './../components/Charity';

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
		return (
			<div className="container">
				<h1>Home</h1>
				{this.state.charities[0]
					? this.state.charities.map((charity, index) => {
						return <Charity charity={charity} key={index}/>
					})
				: <div className="loading">Loading...</div>}

				{this.state.campaigns[0]
					? this.state.campaigns.map((campaign, index) => {
						return <Campaign campaign={campaign} key={index}/>
					})
				: <div className="loading">Loading...</div>}
			</div>
		);
  	}
}

export default HomeView;
