/** @namespace components/Field */

// Import dependencies
import React, { Component } from 'react';

class Field extends Component {

	/**
	 * Creates initial state using props based to component, binds functions
	 * @memberof components/Field#
	 */
	constructor (props) {
		super(props);
		this.state = {
			value: this.props.field.value,
		};
		this.handleChange = this.handleChange.bind(this);
	}

	/**
	 * Renders view based on field.type passed to props
	 * @memberof components/Field#
	 */
	render() {
		return (
			<div className="field">
				<span>{this.props.field.name}</span>
				{ this.props.field.type === 'textarea'
					? <textarea value={this.state.value} onChange={this.handleChange} placeholder={this.placeholder} ></textarea>
					: null }
				{ this.props.field.type === 'text' || this.props.field.type === 'email' || this.props.field.type === 'password'
					? <input type={this.props.field.type} value={this.state.value} onChange={this.handleChange} place={this.placeholder} />
					: null }
			</div>
		);
  	}

	/**
	 * Watches field changes, updates state
	 * @memberof components/Field#
	 */
	handleChange(event) {
		this.setState({value: event.target.value});
	}

}

export default Field;
