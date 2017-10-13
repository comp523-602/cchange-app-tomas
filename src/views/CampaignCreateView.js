/** @namespace views/CampaignEditView */

// Import dependencies
import React, { Component } from 'react';
import FormConfigs from './../modules/FormConfigs';
import Form from './../components/Form';
import Requests from './../modules/Requests';
import Authentication from './../modules/Authentication';

class CampaignCreateView extends Component {

  /**
  * Creates initial state using null values
  * @memberof views/CampaignCreateView
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
  *
  */
  componentWillMount () {

    // Set up campaign create form
    var campaignCreateForm = FormConfigs.campaignCreate();

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
          : <h1>Whoops! Looks like you've navigated somewhere you shouldn't.</h1>
        }
      </div>
    );
  }

  /**
  * Passed to components/Form to be exeuted on successful request
  * @memberof views/CampaignCreateView#
  */
  onSuccess (response) {
    window.location.href = '/charity/' + this.props.location.state.guid;
  }
}

export default CampaignCreateView;
