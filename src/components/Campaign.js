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
	  <Link to={'/campaign/' + this.props.campaign.guid}>
	  <div className="item campaign row">
	  	{ this.props.campaign.pictures.length
		  ? <img src={this.props.campaign.pictures[0]} alt={this.props.campaign.name} />
		  : null }
		  <div className="info">
		    <h3>{this.props.campaign.name}</h3>
            <p>{this.props.campaign.description}</p>
		  </div>
      </div>
	  </Link>
    )
  }
}

export default Campaign;
