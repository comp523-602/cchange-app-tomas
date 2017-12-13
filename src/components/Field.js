/** @namespace components/Field */

// Import dependencies
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import 'cropperjs/dist/cropper.css';
import Cropper from 'react-cropper';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class Field extends Component {

	/**
	 * Creates initial state using props based to component, binds functions
	 * @memberof components/Field#
	 */
	constructor (props) {
		super(props);
		this.state = {
			value: this.props.field.value
		};
		this.handleChange = this.handleChange.bind(this);
		this.onImageDrop = this.onImageDrop.bind(this);
		this.removeImage = this.removeImage.bind(this);
		this.handleCategorySelect = this.handleCategorySelect.bind(this);
	}

	/**
	 * Handles flow of image upload value setting
	 * @memberof components/Field#
	 */
	onImageDrop(files) {

		// Handle single image
		if (this.props.field.type === "singleImageCrop") {
			const reader = new FileReader();
			reader.onload = () => {
				this.setState({
					value: null,
					uncroppedImage: reader.result
				});
			};
			reader.readAsDataURL(files[0]);
		}

		// Handle multiple images
		if (this.props.field.type === "multipleImage") {
			for (var i in files) {
				const reader = new FileReader();
				reader.onload = () => {
					var images = this.state.value;
					images.push(reader.result);
					this.setState({
						value: images,
					});
				}
				reader.readAsDataURL(files[i]);
			}
		}
	}

	crop () {
		var newValue = this.refs.cropper.getCroppedCanvas().toDataURL();
		if (newValue) this.setState({'value': newValue});
	}

	removeImage (event) {
		var images = this.state.value;
		for (var i in images) {
			if (images[i] === event.target.src) images.splice(i, 1);
		}
		this.setState({
			value: images,
		});
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
	 * Watches select field changes, updates state
	 * @memberof components/Field#
	 */
	handleCategorySelect(option) {
		this.setState({value: option});
	}

	/**
	 * Renders view based on field.type passed to props
	 * @memberof components/Field#
	 */
	render() {
		return (
			<div className={this.props.field.css ? "field "+this.props.field.css : "field"}>
				<span className="title">{this.props.field.name}</span>
				{ this.props.field.type === 'text' || this.props.field.type === 'email' || this.props.field.type === 'password' ||
					this.props.field.type === 'number'
					? <input type={this.props.field.type}
						value={this.state.value}
						onChange={this.handleChange}
						placeholder={this.props.field.placeholder} />
					: null }
				{ this.props.field.type === 'textarea'
					? <textarea value={this.state.value}
						onChange={this.handleChange}
						placeholder={this.props.field.placeholder} ></textarea>
					: null }
				{ this.props.field.type === 'categories'
					? (<div className="selectCategoryDiv">
						<Select id="categorySelect"
							autoFocus
							simpleValue
							value={this.state.value}
							onChange={this.handleCategorySelect}
							options={this.props.field.options}
							/>
						</div>
						)
					: null}
				{ this.props.field.type === 'singleImageCrop'
					? (
						<div>
							{ this.state.value
								? <img src={this.state.value} alt="To upload" className="imageThumbnail" />
								: null }
							<Dropzone
								onDrop={this.onImageDrop}
								multiple={false}
								accept="image/*"
								disablePreview={true}>
								<div>{this.state.value ? 'Edit image' : 'Upload your image here'}</div>
							</Dropzone>
							{this.state.uncroppedImage ?
								<div>
									<span>Crop your image</span>
									<Cropper
										style={{ height: '100%', width: '100%' }}
										preview=".img-preview"
										src={this.state.uncroppedImage}
									 	ref="cropper"
										aspectRatio={1}
										guides={false}
										background={false}
										movable={false}
										rotatable={false}
										scalable={false}
										zoomable={false}/>
									 <span>Preview</span>
									 <div className="img-preview" style={{width: 300, height: 300, overflow: 'hidden'}} />
								 </div>
								 : null}
						</div>
					)
					: null }
				{ this.props.field.type === 'multipleImage'
					?
					(
						<div>
							<Dropzone
								onDrop={this.onImageDrop}
								accept="image/*">
								<div>Upload your images here</div>
							</Dropzone>
							{ this.state.value instanceof Array
								? this.state.value.map((image, index) => {
									return <img src={image}
										alt="To upload"
										className="imageThumbnail"
										key={index}
										onClick={this.removeImage} />
								})
								: null }
							{ this.state.value instanceof Array && this.state.value.length
								? <span className="instructions">Click an image to remove it</span>
								: null }
						</div>
					)
					: null}
				{ this.props.field.instructions
					? <span className="instructions">{this.props.field.instructions}</span>
					: null }
			</div>
			);
  	}

}

export default Field;
