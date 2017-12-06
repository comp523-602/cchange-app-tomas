/** @namespace components/Update */

// Import dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Format from './../modules/Format';

class Update extends Component {

  /**
  * Renders Update element
  * @memberof components/Update#
  */
  render() {
	  return (
		  <Link to={'/update/' + this.props.update.guid}>
		  <div className="item update row">
		 		<div className="inside">
					<div class="time">Posted {Format.time(this.props.update.dateCreated)}</div>
			    	<h3>{this.props.update.name}</h3>
	            	<p>{this.props.update.description}</p>
				</div>
	      </div>
		  </Link>
    )
  }
}

export default Update;
