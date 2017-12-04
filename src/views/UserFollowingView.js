/** @namespace views/FollowingView */

// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';
import User from './../components/User';

class FollowingView extends Component {

    constructor(props){
        super(props)
        this.state = {
            'user': null,
            'followingArr': []
        }
    }

    componentWillMount() {
        var userGUID = this.props.match.params.guid
        console.log(userGUID);

        Requests.makeRequest('user', {
            'user': userGUID
        }, (error, body) => {
            var user = body.user;
            console.log(user);
            this.setState({
                'user': user,
                'followingArr': user.followingUsers
            }, function() {
                console.log(this.state.followingArr);
            });
        });
    }

    render() {
        return (
            <div>
                {this.state.user
                ? <b>Who {this.state.user.name} is following</b>
                : null}
                <div className={"item post row"}>
                    {this.state.followingArr[0]
                        ? this.state.followingArr.map((user, index) => {
                            return <User user={user} key={index}/>
                        })
                        : null}
                </div>
            </div>
        )
    }
}
export default FollowingView