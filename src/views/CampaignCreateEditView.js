/** @namespace views/CampaignCreateEditView */

import React, { Component } from 'react';
import FormConfigs from './../modules/FormConfigs';
import Form from './../components/Form';
import Requests from './../modules/Requests';

class CampaignCreateEditView extends Component {

    /**
     * Creates initial state using null values
     * @memberof views/CampaignCreateEditView#
     */
     constructor(props) {
         super(props);
         this.state = {};
         this.onSuccess = this.onSuccess.bind(this);
     }

     /**
      * Gets Campaign object
      * @memberOf views/CampaignCreateEditView#
      */
      componentWillMount(newProps) {

		  // Get campaign GUID from props
  		var campaignGUID = null;
  		if (newProps) campaignGUID = newProps.match.params.guid;
  		else campaignGUID = this.props.match.params.guid;

		  if (campaignGUID) {
			  var self = this;
			  Requests.makeRequest('list.single', {
				  'type': "campaign",
				  'guid': campaignGUID
			  }, function(error, body) {
				  var campaign = body.object;

				  var campaignForm = FormConfigs.campaignCreateEdit(campaignGUID);
				  campaignForm.fields.name.value = campaign.name;
				  campaignForm.fields.description.value = campaign.description;
				  campaignForm.fields.pictures.value = campaign.pictures;

				  self.setState({
					  'campaignForm': campaignForm
				  });
			  })
		  } else {
			  this.setState({
				  'campaignForm': FormConfigs.campaignCreateEdit(),
			  });
		  }

      }

      /**
       * Renders view
       * @memberOf views/CampaignEditView#
       */
      render() {
        return (
			<div className="container">
				{ this.state.campaignForm
					? <Form form={this.state.campaignForm} onSuccess={this.onSuccess} />
					: <div className="loading">Loading...</div> }
			</div>
		);
      }

      onSuccess (response) {
		window.location.href = '/campaign/'+response.campaign.guid;
	}
}

export default CampaignCreateEditView;