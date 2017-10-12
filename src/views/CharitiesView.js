
// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';
import { Link } from 'react-router-dom';

class CharitiesView extends Component {

	/**
	 * Creates initial state with null values
	 * @memberof views/CharitiesView#
	 */

	 constructor(props) {
		 super(props)
		 this.state = {
			 'charities': [],
			 'pageSize': null, //create html element for user ot choose number
		 };
	 }

	 /**
	  * Gets list of charities
	  * @memberof views/CharitiesView#
	  */
	componentWillMount() {
		var self = this;

		//Get list of 10 charities from the server
		Requests.makeRequest('charities', {
			'pageSize' : 10,
			'sort': 'desc',
			'sortKey' : 'dateCreated'
		}, function(error, body) {
			for(var i = 0; i < body.charities.length; i++) {
				//var temp = self.state.charities.concat(body.charities[i].name + "\n");
				console.log(body.charities[i]);
				//self.setState({
					//'charities' : temp
				//})
			}

		})
	}  
	render() {
		return (
			<div className="container">
				<h1>Charities</h1>				
				{ this.state.charities
					? (
						<div className="objectHeader">
							<h1>{this.state.charities}</h1>
						</div>
					)
					: <div className="loading">Loading...</div> }
			</div>

		);
  	}
}

export default CharitiesView;
