/** @namespace components/User */

// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';
import { Link } from 'react-router-dom';

class User extends Component {

    render() {
        return(
			<Link to={'/user/' + this.props.user.guid}>
  		  <div className="item update row">
  			    <h3>{this.props.user.name}</h3>
  	            <p>{this.props.user.bio}</p>
  	      </div>
  		  </Link>
        )
    }
}
export default User;