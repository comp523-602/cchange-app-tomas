/** @namespace components/Field */

// Import dependencies
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
class Field extends Component {

	/**
	 * Creates initial state using props based to component, binds functions
	 * @memberof components/Field#
	 */
	constructor (props) {
		super(props);
		this.state = {
			value: this.props.field.value,
			image: null,
			fileURL: ""
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
					? <textarea value={this.state.value} onChange={this.handleChange} placeholder={this.props.field.placeholder} ></textarea>
					: null }

				{ this.props.field.type === 'text' || this.props.field.type === 'email' || this.props.field.type === 'password'
					? <input type={this.props.field.type} value={this.state.value} onChange={this.handleChange} placeholder={this.props.field.placeholder} />
					: null }

				{ this.props.field.type === 'singleImage'
					? (
						<Dropzone onDrop={this.onImageDrop.bind(this)} multiple={false} accept="image/*">
							<div>Upload your image here</div>
							{ this.props.field.value !== null
								? <img src={this.props.field.value} className="uploadedImage" alt="Uploaded" />
								: null }
						</Dropzone>
					)
					: null }

				{ this.props.field.instructions
					? <span className="instructions">{this.props.field.instructions}</span>
					: null }
			</div>
		);
  	}
	/**
	 * Passed to components/Form to be executed on successful request
	 * @memberof components/Field#
	 */
	onImageDrop(files) {
        this.handleImageUpload(files[0]);
    }

    /**
     * Makes the post request to to the cloudinary server
     * Success: updates field value with imageURL
     * Error: print error message to console
	 * @memberof components/Field#
     * @param {*} file
     */
    handleImageUpload(file) {
	    request.post('https://api.cloudinary.com/v1_1/cchange/image/upload')
	         .field('upload_preset', 'kajpdwj4')
	         .field('file', file)
			 .end((err, response) => {

				// Handle image errors
	        	if (err) console.error(err);

				// Get URL from Cloudinary
				var imageURL = response.body.secure_url;

				// Update value with image URL
				this.setState({
					value: imageURL
				});

	    	});
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
