/** @namespace views/DonationHistoryView */
// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';
import User from './../components/User';
import { Link } from 'react-router-dom';
import Donation from './../components/Donation';

class DonationHistoryView extends Component {
    constructor(props){
        super(props)
        this.state = {
            'user': null,
            'donations': []
        }
    }

    componentWillMount(newProps) {
        var userGUID = null;
        if(newProps) userGUID = newProps.match.params.guid
        else userGUID = this.props.match.params.guid;
        console.log(userGUID);

        Requests.makeRequest('user', {
            'user': userGUID
        }, (error, body) => {
            var user = body.user;
            this.setState({
                'user': user
            }, function() {
                return;
            })
        })

        Requests.makeRequest('donations', {
            'user': userGUID
        }, (error, body) => {
            var donations = body.donations;
            this.setState({
                'donations': donations
            },function() {
                return;
            })
        })
    }
    render() {
        return(
            <div className="container">
                {this.state.user
                ? <h1>{this.state.user.name}'s donation history</h1>
                : <h1>Loading</h1>
                }
                {this.state.donations[0]
                ? this.state.donations.sort(this.compare).map((donation, index) => {
                    return <Donation donation={donation} key={index}/>
                })
                : <h3>No donations to show</h3>
                }
            </div>
        )
    }
    /**
	 * Sorting function for campaign posts
	 * @memberof views/CampaignView#
	*/
	compare (a, b) {
		if (a.dateCreated < b.dateCreated) {
			return 1;
		}
		if(a.dateCreated > b.dateCreated) {
			return -1;
		}
		return 0;
	}
}
export default DonationHistoryView