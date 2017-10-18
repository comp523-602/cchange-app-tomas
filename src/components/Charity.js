/** @namespace components/Charity */

// Import dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Charity extends Component {

  /**
  * Renders Charity element
  * @memberof components/Charity#
  */
  render() {
    return (
      <div className="item row">
	  	{ this.props.charity.logo
		  ? <img src={this.props.charity.logo} alt={this.props.charity.name} />
		  : null }
        <h3><Link to={'/charity/' + this.props.charity.guid}>{this.props.charity.name}</Link></h3>
        <p>{this.props.charity.description}</p>
      </div>
    )
  }
}

export default Charity;
