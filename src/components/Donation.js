/** @namespace components/Donation */

// Import dependencies
import React, { Component } from 'react';
import Moment from 'moment';
import Authentication from './../modules/Authentication';
import { Link } from 'react-router-dom';
class Donation extends Component {

  render() {
    return(
      <div className="item row">
        {this.props.donation
        ? <div>
            <Link to={"/user/" + this.props.donation.user}>
              <h3>{this.props.donation.donatingUserName}</h3>
            </Link>
            <p>donated to</p>
            { this.props.donation.post || this.props.donation.campaign
            ? <div>
              <Link to={"/post/" + this.props.donation.post}>
                  <p>{this.props.donation.postingUserName + "'s post'"}</p>
                </Link>
                <Link to={"/campaign/" + this.props.donation.campaign}>
                  <h3>Campaign: {this.props.donation.campaignName}</h3>
                </Link>
                </div>
            : null}
            <Link to={"/charity" + this.props.donation.charity}>
              <h3>Charity: {this.props.donation.charityName}</h3>
            </Link>
            {Authentication.getUser() && Authentication.getUser().guid === this.props.donation.user
              ? <h3>Amount: ${this.props.donation.amount}</h3>
              : null}
            <h3>{Moment(this.props.donation.dateCreated*1000).fromNow()}</h3>
          </div>
        : <div> Loading donation... </div>}
      </div>
    )
  }
}

export default Donation;
