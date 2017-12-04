/** @namespace components/Update */

// Import dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Update extends Component {

  /**
  * Renders Update element
  * @memberof components/Update#
  */
  render() {
	  return (
		  <Link to={'/update/' + this.props.update.guid}>
		  <div className="item update row">
			    <h3>{this.props.update.name}</h3>
	            <p>{this.props.update.description}</p>
	      </div>
		  </Link>
    )
  }
}

export default Update;
