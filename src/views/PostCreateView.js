/** @namespace views/PostCreateView */

// Import dependencies
import React, { Component } from 'react';
import FormConfigs from './../modules/FormConfigs';
import Form from './../components/Form';
import Authentication from './../modules/Authentication';

class PostCreateView extends Component {

  /**
  * Creates initial state using null values
  * @memberof views/PostCreateView#
  */
  constructor (props) {
    super(props);
    this.state = {
      postCreateForm: null,
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
     window.location.href = '/campaign/' + response.post.campaign;
  }
}

export default PostCreateView;
