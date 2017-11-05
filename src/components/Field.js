/** @namespace components/Field */

// Import dependencies
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import 'cropperjs/dist/cropper.css';
import Cropper from 'react-cropper';

class Field extends Component {

	/**
	 * Creates initial state using props based to component, binds functions
	 * @memberof components/Field#
	 */
	constructor (props) {
		super(props);
		this.state = {
			value: this.props.field.value,
			imageUploaded: false,
			src: null,
		};
		this.handleChange = this.handleChange.bind(this);
		this.onImageDrop = this.onImageDrop.bind(this);
	}

	/**
	 * Handles flow of image upload value setting
	 * @memberof components/Field#
	 */
	onImageDrop(files) {
		if (this.props.field.type === "singleImageCrop") {

			const reader = new FileReader();
			reader.onload = () => {
				this.setState({ src: reader.result });
			};
			reader.readAsDataURL(files[0]);
		} else
			this.setState({ value: files[0]});
  }

	/**
	 * Watches field changes, updates state
	 * @memberof components/Field#
	 */
	handleChange(event) {
		event.preventDefault();
		this.setState({value: event.target.value});
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
						<div>
							{ this.state.value
								? <img src={this.state.value} className="uploadedImage" alt="Uploaded" />
								: null }
							<Dropzone onDrop={this.onImageDrop.bind(this)} multiple={false} accept="image/*">
								<div>Upload your image here</div>
							</Dropzone>
						</div>
					)
					: null }

				{ this.props.field.type === 'singleImageCrop'
					? (
						<div>
							<Dropzone onDrop={this.onImageDrop.bind(this)} multiple={false} accept="image/*" disablePreview={true} onChange={this.hand} >
								<div>{this.state.src? 'Edit image' : 'Upload your image here'}</div>
							</Dropzone>
							{this.state.src?
								<div>
								 <span>Crop your image</span>
								 <Cropper style={{ height: '100%', width: '100%' }} preview=".img-preview" src={this.state.src}
								 	ref="cropper" aspectRatio={1} guides={false}
									background={false} movable={false} rotatable={false} scalable={false} zoomable={false}/>
								 <span>Preview</span>
								 <div className="img-preview" style={{width: 300, height: 300, overflow: 'hidden'}} />
								 </div> : null}
						</div>
					)
					: null }

				{ this.props.field.instructions
					? <span className="instructions">{this.props.field.instructions}</span>
					: null }
			</div>
			);
  	}

}

export default Field;
