/** @namespace components/Donation */

// Import dependencies
import React, { Component } from 'react';
import Authentication from './../modules/Authentication';
import { Link } from 'react-router-dom';
import Format from './../modules/Format';

class Donation extends Component {

  render() {
    return(
      <div className="item donation row">
	  		<div class="time">{Format.time(this.props.donation.dateCreated)}</div>
	  		<Link to={"/user/" + this.props.donation.user}>
		  	{Authentication.getUser() && Authentication.getUser().guid === this.props.donation.user
				? "You"
				: this.props.donation.donatingUserName}
            </Link>
			<span> donated</span>
			{Authentication.getUser() && Authentication.getUser().guid === this.props.donation.user
			  ? <span>{" "+Format.currency(this.props.donation.amount)}</span>
			  : null}
			<span> to</span>
            { this.props.donation.post
            	? <span><Link to={"/post/" + this.props.donation.post}>
					{Authentication.getUser() && Authentication.getUser().guid === this.props.donation.postingUser
						? " your post"
						: " "+this.props.donation.postingUserName + "'s post"}
					</Link> supporting </span>
            	: null}
			{ this.props.donation.campaign
            	? <span>
					<Link to={"/campaign/" + this.props.donation.campaign}>{" "+this.props.donation.campaignName}</Link> by
				</span>
            	: null}
            <Link to={"/charity" + this.props.donation.charity}>{" "+this.props.donation.charityName}</Link>
      </div>
    )
  }
}

export default Donation;
