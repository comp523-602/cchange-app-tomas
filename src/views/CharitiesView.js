/** @namespace views/CharitiesView */

// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';
import { Link } from 'react-router-dom';
import Charity from './../components/Charity';

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
		//Get list of 10 charities from the server
		Requests.makeRequest('charities', {
			'pageSize' : 10,
			'sort': 'desc',
			'sortKey' : 'dateCreated'
		}, (error, body) => {
			this.setState({
				charities: body.charities,
			})
		})
	}

	render() {
		return (
			<div className="container">
				<h1>Charities</h1>
				{ this.state.charities[0]
					? this.state.charities.map((charity, index) => {
							return <Charity charity={charity} key={index}/>
						})
					: <div className="loading">Loading...</div> }
			</div>

		);
	}
}

export default CharitiesView;
