/** @namespace components/Field */

// Import dependencies
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import $ from 'jquery';
import PropTypes from 'prop-types'; 
import Storage from '../modules/Storage';
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
					? <textarea value={this.state.value} onChange={this.handleChange}></textarea>
					: null }
				{ this.props.field.type === 'text' || this.props.field.type === 'email' || this.props.field.type === 'password'
					? <input type={this.props.field.type} value={this.state.value} onChange={this.handleChange} />
					: null }
				{
					this.props.field.type === 'singleImage'
					? <Dropzone
						onDrop={this.onImageDrop.bind(this)}
						multiple={false}
						accept="image/*"
						>
						<div>Drop or select your files here</div>
						<img src={this.state.uploadedFileCloudinaryUrl}/>
					 </Dropzone>
					 : null }
				
			</div>
		);
  	}
	/**
	 * Passed to components/Form to be executed on successful request
	 * @memberof views/CharityEditView#
	 */
	onImageDrop(files) {
        this.handleImageUpload(files[0]);
    }
	
    /**
     * Makes the post request to to the cloudinary server
     * Success: print upload information to console
     * Error: print error message to console
     * @param {*} file
     * @public
     */
    handleImageUpload(file) {
		var self = this;
        let upload = request.post('https://api.cloudinary.com/v1_1/cchange/image/upload')
             .field('upload_preset', 'kajpdwj4')
             .field('file', file);

        upload.end((err, response) => {
            if (err) {
                console.error(err);
            }

            if (response.body.secure_url !== '') {
                this.setState({
                    uploadedFileCloudinaryUrl: response.body.secure_url
                });
                $.ajax({
                    type: "POST",
                    url: "//api.cchange.ga/charity.logo",
                    contentType: 'application/json',
                    headers: { "Authorization":  Storage.get('token') },
                    data: JSON.stringify({
                      'logo': this.state.uploadedFileCloudinaryUrl,
                    }),
                    success: function (data, status) {
						self.setState({
							uploadedFileCloudinaryUrl: data.charity.logo
						});
                        console.log(data.charity.logo);
                    },
                    error: function(data, status) {
                        console.log(data);
                    }
                });
            }
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