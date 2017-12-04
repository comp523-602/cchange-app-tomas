/** @namespace views/UpdateView */

// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';
import FormConfigs from './../modules/FormConfigs';
import Form from './../components/Form';
import Authentication from './../modules/Authentication';
import { Link } from 'react-router-dom';

class UpdateView extends Component {

	constructor(props) {
		super(props)
		this.state = {};
	}

	componentWillMount(newProps) {

		var updateGUID = null;
		if(newProps) updateGUID = newProps.match.params.guid;
		else updateGUID = this.props.match.params.guid;

		Requests.makeRequest('update', {
			'update': updateGUID
		}, (error, body) => {
			var update = body.update;
			this.setState({
				'update': update
			})
		})

	}
	render() {
		return (
			<div className="heading">
				<div className="container">
				{ this.state.update
					? <div className="profileHeading">
						<h1>{this.state.update.name}</h1>
						<p>{this.state.update.description}</p>
					</div>
					: <div className="loading">Loading update...</div> }
				{ this.state.update && Authentication.status() === Authentication.CHARITY && Authentication.getUser().charity === this.state.update.charity
					?	<Link to={'/updateEdit/' + this.props.match.params.guid}>Edit update</Link>
					: null}
					</div>
			</div>
		);
	}

}

export default UpdateView;
