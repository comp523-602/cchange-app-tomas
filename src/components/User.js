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
            'user': this.props.user
        }
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