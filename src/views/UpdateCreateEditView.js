/** @namespace views/UpdateCreateEditView */

import React, { Component } from 'react';
import FormConfigs from './../modules/FormConfigs';
import Form from './../components/Form';
import Requests from './../modules/Requests';

class UpdateCreateEditView extends Component {

    /**
     * Creates initial state using null values
     * @memberof views/UpdateCreateEditView#
     */
     constructor(props) {
         super(props);
         this.state = {};
         this.onSuccess = this.onSuccess.bind(this);
     }

     /**
      * Gets update object
      * @memberOf views/UpdateCreateEditView#
      */
      componentWillMount(newProps) {

		  // Get update GUID from props
  		var updateGUID = null;
  		if (newProps) updateGUID = newProps.match.params.guid;
  		else updateGUID = this.props.match.params.guid;

		  if (updateGUID) {
			  var self = this;
			  Requests.makeRequest('update', {
				  'update': updateGUID
			  }, function(error, body) {
				  var update = body.update;

				  var updateForm = FormConfigs.updateCreateEdit(updateGUID);
				  updateForm.fields.name.value = update.name;
				  updateForm.fields.description.value = update.description;

				  self.setState({
					  'updateForm': updateForm
				  });
			  })
		  } else {
			  this.setState({
				  'updateForm': FormConfigs.updateCreateEdit(),
			  });
		  }

      }

      /**
       * Renders view
       * @memberOf views/#UpdateCreateEditView
       */
      render() {
        return (
			<div className="container">
				{ this.state.updateForm
					? <Form form={this.state.updateForm} onSuccess={this.onSuccess} />
					: <div className="loading">Loading...</div> }
			</div>
		);
      }

	  /**
	   * Success function
	   * @memberOf views/#UpdateCreateEditView
	   */
      onSuccess (response) {
		window.location.href = '/update/'+response.update.guid;
	}
}

export default UpdateCreateEditView;