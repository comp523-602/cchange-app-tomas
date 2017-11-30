/** @namespace components/User */

// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';
import Authentication from './../modules/Authentication';
import { Link } from 'react-router-dom';
import $ from 'jquery';
class User extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            'user': null
        }
    }
    componentWillMount() {
        Requests.makeRequest('user', {
            'user': this.props.user
        }, (error, body) => {
            var user = body.user;
            this.setState({
                'user': user
            }, function() {
                return;
            })
        })
    } 
    render() {
        return(
            <div className="item post row">
                {console.log("User.js reports: " + this.state.user)}
                {this.state.user
                    ?<div>
                        <Link to={"/user/" + this.state.user.guid}>
                            <p>{this.state.user.name}</p>
                        </Link>
                     </div>
                    : <div className="loading">Loading User...</div>}
            </div>
        )
    }
}
export default User;