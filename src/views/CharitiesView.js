/** @namespace views/CharitiesView */

// Import dependencies
import React, { Component } from 'react';
import List from './../components/List';

class CharitiesView extends Component {

	/**
	 * Renders view
	 * @memberof views/CharitiesView#
	 */
	render() {

		const listConfig = {
			address: 'charities',
			responseKey: 'charities',
		};

		return (
			<div className="container">
				<h1 className="row">Charities</h1>
				<List config={listConfig} />
			</div>
		);
	}
}

export default CharitiesView;
