/** @namespace views/PostCreateView */

// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';
import FormConfigs from './../modules/FormConfigs';
import Form from './../components/Form';
import Authentication from './../modules/Authentication';
import $ from 'jquery';

class PostCreateView extends Component {

  /**
  * Creates initial state using null values
  * @memberof views/PostCreateView#
  */
  constructor (props) {
    super(props);
    this.state = {
      postCreateForm: null,
      campaign: null
    };
    this.onSuccess = this.onSuccess.bind(this);
  }

  /**
  * Sets up campaign create form
  * @memberof views/PostCreateView#
  */
  componentWillMount () {
    var campaignGUID = this.props.match.params.guid;

    // Set up campaign create form
    var postCreateForm = FormConfigs.postCreate(campaignGUID);
    Requests.makeRequest('campaign', {
      'campaign': campaignGUID
    }, (error, body) => {
        this.setState({
          'campaign': body.campaign
        });
        $("h2").append(this.state.campaign.name);
    })
    // Add campaign form to state
    this.setState({
      'postCreateForm': postCreateForm,
    })
  }

  /**
  * Renders view
  * @memberof views/PostCreateView#
  */
  render() {
    return (
      <div className="container">
        {Authentication.status() === Authentication.USER
          ? this.state.postCreateForm
            ? <Form form={this.state.postCreateForm} onSuccess={this.onSuccess} />
            : null
          : <h1>Whoops! Looks like youve navigated somewhere you shouldnt.</h1>
        }
      </div>
    );
  }

  /**
  * Passed to components/Form to be exeuted on successful request
  * @memberof views/PostCreateView#
  */
  onSuccess (response) {
     var campaign = response.campaign;
     $(".container").append("<p>Post created!</p>");
     window.setTimeout(function(){
      window.location.href = '/campaign/' + response.post.campaign;
     }, 750);
  }

  onDonate(response){
    //more to be added once we have microtransactions
    var amount = response.donation.amount;
    //$(".donation").append("<p>You just donated $" + amount + "!</p>");
 }
}

export default PostCreateView;
