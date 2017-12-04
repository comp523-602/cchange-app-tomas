/** @namespace views/UpdateView */

// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';
import FormConfigs from './../modules/FormConfigs';
import Form from './../components/Form';

class UpdateView extends Component {

	constructor(props) {
		super(props)
		this.state={
			'charity': null
		}
	}

	componentWillMount(newProps) {
		var charityGUID = null;
		if(newProps) charityGUID = newProps.match.params.gui;
		else charityGUID = this.props.match.params.guid;

		Requests.makeRequest('charity', {
			'charity': charityGUID
		}, (error, body) => {
			var charity = body.charity;
			this.setState({
				'charity': charity
			})
		})

	}
	render() {
		return (
			<div className="container">

				{/*Multiple this.state.charity statements because this
					{this.state.charity
						?(<h1>Make an update for {this.state.charity.name}</h1>,
							<Form form = {FormConfigs.update(this.state.charity.guid, this.state.charity.name)} onSuccess={this.onUpdate}/>)
						: null}}
					doesn't return both the name and form - just the form*/}

				{this.state.charity
				?<h1>Make an update for {this.state.charity.name}</h1>
				: null}

				{this.state.charity
					? <Form form = {FormConfigs.update(this.state.charity.guid, this.state.charity.name)} onSuccess={this.onUpdate}/>
					: <div>Loading...</div>}
			</div>
		);
	}

	onUpdate(response) {
		console.log(response);
		var charity = response.update.charity; // .charity is the charity's guid
		window.location.href = '/charity/' + charity;

	}
}

export default UpdateView;
