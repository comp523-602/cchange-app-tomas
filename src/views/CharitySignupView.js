
// Import dependencies
import React, { Component } from 'react';
import Forms from './../modules/Forms';
import Form from './../components/Form';
import Authentication from './../modules/Authentication';

class CharitySignupView extends Component {

	constructor (props) {
		super(props);
		this.state = {
			'charitySignupForm': Forms.charitySignup(),
		}
	}

	render() {

		// Add charityToken to charitySignupForm from route parameters
		var params = {
			'charityToken': this.props.match.params.charityToken,
		};

		return (
			<div className="container">
				<Form form={this.state.charitySignupForm} onSuccess={this.onSuccess} requestParams={params} />
			</div>
		);
  	}


	onSuccess (response) {
		window.location.href = '/charity/'+this.props.match.params.guid;
	}
}

export default CharitySignupView;
