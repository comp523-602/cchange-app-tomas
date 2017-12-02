/** @namespace views/DonationHistoryView */
// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';
import User from './../components/User';
import { Link } from 'react-router-dom';

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
            console.log(userGUID)
            var donations = body.updates;
            this.setState({
                'donations': donations
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
                {this.state.donations
                ? <h3>Placeholder for returning donations</h3>
                : <h3>No donations to show</h3>
                }
            </div>
        )
    }
}
export default DonationHistoryView