/** @namespace components/FollowUser */

// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';
import { Link } from 'react-router-dom';
class FollowUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            'user': null
        }
    }

    componentWillMount() {

        Requests.makeRequest('list.single', {
			'type': "user",
            'guid': this.props.user
        }, (error, body) => {
            var user = body.object;
			if (!user) return;
            this.setState({
                'user': user
            });
        })

    }

    render() {
        return(
            <div className="item post row">
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
export default FollowUser;