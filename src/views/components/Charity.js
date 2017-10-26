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
	  <Link to={'/charity/' + this.props.charity.guid}>
      <div className="item charity row">
	  	{ this.props.charity.logo
		  ? <img src={this.props.charity.logo} alt={this.props.charity.name} />
		  : null }
		  <div className="info">
		    <h3>{this.props.charity.name}</h3>
            <p>{this.props.charity.description}</p>
		  </div>
      </div>
	  </Link>
    )
  }
}

export default Charity;
