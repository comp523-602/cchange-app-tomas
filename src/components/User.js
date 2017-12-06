/** @namespace components/User */

// Import dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Format from './../modules/Format';

class User extends Component {

    render() {
        return(
			<Link to={'/user/' + this.props.user.guid}>
  		  <div className="item update row">
		  	<div className="inside">
				<div class="time">Joined {Format.time(this.props.user.dateCreated)}</div>
  			    <h3>{this.props.user.name}</h3>
  	            <p>{this.props.user.bio}</p>
			</div>
  	      </div>
  		  </Link>
        )
    }
}
export default User;