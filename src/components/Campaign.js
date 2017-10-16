/** @namespace components/Campaign */

// Import dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Campaign extends Component {

  /**
  * Creates initial props for Campaign list element
  * @memberof components/Campaign#
  */
  constructor(props) {
    super(props)
  }

  /**
  * Renders Campaign element
  * @memberof components/Campaign#
  */
  render() {
    return (
      <div className="item row">
        <h3><a href={'/campaign/' + this.props.campaign.guid}>{this.props.campaign.name}</a></h3>
        <p>{this.props.campaign.description}</p>
      </div>
    )
  }
}

export default Campaign;
