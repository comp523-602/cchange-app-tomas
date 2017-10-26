/** @namespace views/CampaignCreateView */

// Import dependencies
import React, { Component } from 'react';
import FormConfigs from './../modules/FormConfigs';
import Form from './../components/Form';
import Authentication from './../modules/Authentication';

class CampaignCreateView extends Component {

  /**
  * Creates initial state using null values
  * @memberof views/CampaignCreateView#
  */
  constructor (props) {
    super(props);
    this.state = {
      campaignCreateForm: null,
    };
    this.onSuccess = this.onSuccess.bind(this);
  }

  /**
  * Sets up campaign create form
  * @memberof views/CampaignCreateView#
  */
  componentWillMount () {

    // Set up campaign create form
    var campaignCreateForm = FormConfigs.campaignCreateEdit();

    // Add campaign form to state
    this.setState({
      'campaignCreateForm': campaignCreateForm,
    })
  }

  /**
  * Renders view
  * @memberof views/CampaignCreateView#
  */
  render() {
    return (
      <div className="container">
        {Authentication.status() === Authentication.CHARITY
          ? this.state.campaignCreateForm
            ? <Form form={this.state.campaignCreateForm} onSuccess={this.onSuccess} />
            : null
          : <h1>Whoops! Looks like youve navigated somewhere you shouldnt.</h1>
        }
      </div>
    );
  }

  /**
  * Passed to components/Form to be exeuted on successful request
  * @memberof views/CampaignCreateView#
  */
  onSuccess (response) {
	var campaign = response.campaign;
    window.location.href = '/campaign/' + campaign.guid;
  }
}

export default CampaignCreateView;
