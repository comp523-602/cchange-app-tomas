/** @namespace components/Campaign */

// Import dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Campaign extends Component {

  /**
  * Renders Campaign element
  * @memberof components/Campaign#
  */
  render() {
    return (
      <div className="item row">
        <h3><Link to={'/campaign/' + this.props.campaign.guid}>{this.props.campaign.name}</Link></h3>
        <p>{this.props.campaign.description}</p>
      </div>
    )
  }
}

export default Campaign;
