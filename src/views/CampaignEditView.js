/** @namespace views/CampaignEditView */

import React, { Component } from 'react';
import FormConfigs from './../modules/FormConfigs';
import Form from './../components/Form';
import Requests from './../modules/Requests';

class CampaignEditView extends Component {

    /**
     * Creates initial state using null values
     * @memberof views/CampaignEditView#
     */

     constructor(props) {
         super(props);
         this.state = {
             campaignEditForm: null
         }
         this.onSuccess = this.onSuccess.bind(this);
     }

     /**
      * Gets Campaign object, updates state using charity object
      * @memberOf views/CampaignEditView#
      */

      componentWillMount() {
          var campaignGUID = this.props.match.params.guid;

          var self = this;

          Requests.makeRequest('campaign', {
              'campaign': campaignGUID
          }, function(error, body) {
              var campaign = body.campaign;

              var campaignForm = FormConfigs.campaignCreateEdit(campaignGUID);
              campaignForm.fields.name.value = campaign.name;
              campaignForm.fields.description.value = campaign.description;
			  campaignForm.fields.pictures.value = campaign.pictures;

              self.setState({
                  'campaignForm': campaignForm
              });
          })
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
		window.location.href = '/campaign/'+this.props.match.params.guid;
	}
}

export default CampaignEditView;