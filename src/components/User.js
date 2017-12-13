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
					{this.props.user.picture != null
						? <img src={this.props.user.picture} alt={this.props.user.name} />
						: null }
					<div className="inside">
						<h3>{this.props.user.name}</h3>
						<p>{this.props.user.bio}</p>
						<div className="time">User &middot; Joined {Format.time(this.props.user.dateCreated)}</div>
					</div>
					<div className="clear">
					</div>
				</div>
  		  	</Link>
        )
    }
}
export default User;