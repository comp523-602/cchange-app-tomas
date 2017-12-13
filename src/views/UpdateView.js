/** @namespace views/UpdateView */

// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';
import Authentication from './../modules/Authentication';
import Format from './../modules/Format';
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

		Requests.makeRequest('list.single', {
			'type': "update",
			'guid': updateGUID
		}, (error, body) => {
			var update = body.object;
			this.setState({
				'update': update
			})
		})

	}
	render() {
		return (
			<div>
				<div className="heading gray update"><div className="container">
				{ this.state.update
					? (
						<div>
							<Link to={"/charity/"+this.state.update.charity}><h3>{this.state.update.charityName}</h3></Link>
							<h1>{this.state.update.name}</h1>
							<span className="time">{Format.time(this.state.update.dateCreated)}</span>
							{ this.state.update && Authentication.status() === Authentication.CHARITY
								&& Authentication.getUser().charity === this.state.update.charity
								? <div><Link to={'/updateEdit/' + this.props.match.params.guid}><button>Edit update</button></Link></div>
								: null}
						</div>
					)
					: <div className="loading">Loading...</div> }
				</div></div>
				<div className="row container">
				{ this.state.update ? this.state.update.description : null}
				</div>
			</div>
		);
	}

}

export default UpdateView;
