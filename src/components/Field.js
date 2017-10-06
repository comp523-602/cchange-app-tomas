
// Import dependencies
import React, { Component } from 'react';

class Field extends Component {

	constructor (props) {
		super(props);
		this.state = {
			value: this.props.field.value,
		};
		this.handleChange = this.handleChange.bind(this);
	}

	render() {
		return (
			<div className="field">
				<span>{this.props.field.name}</span>
				<input type={this.props.field.type} value={this.state.value} onChange={this.handleChange} />
			</div>
		);
  	}

	handleChange(event) {
		this.setState({value: event.target.value});
	}

}

export default Field;