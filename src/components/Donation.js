/** @namespace components/Donation */

// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';
import Moment from 'moment';
import Authentication from './../modules/Authentication';
import { Link } from 'react-router-dom';

class Donation extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render(){
        return(
            <div className="item post row">
                {this.props.donation
                ? <div>
                        {console.log(this.props.donation)}
                        <Link to={"/charity/" + this.props.donation.charity}>
                            <h2 className="charity">{this.props.donation.charityName}</h2>
                        </Link>
                        {this.props.donation.campaign
                        ?   <Link to={"/campaign/" + this.props.donation.campaign}>
                                <h2 className="campaign">{this.props.donation.campaignName}</h2>
                            </Link>
                        : <h5>This was a direct donation to {this.props.donation.charityName}</h5>
                        }
                        <h3 className="donationAmt">${this.props.donation.amount}.00</h3>
                        <h4 className="dateCreated">{Moment(this.props.donation.dateCreated*1000).fromNow()}</h4>

                  </div>
                : null}
            </div>
        )
    }
}
export default Donation;