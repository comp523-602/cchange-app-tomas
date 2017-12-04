/** @namespace views/UserFollowingView */

// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';
import FollowUser from './../components/FollowUser';

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

        Requests.makeRequest('list.single', {
			'type': "user",
            'guid': userGUID
        }, (error, body) => {
            var user = body.object;
			if (!user) return;
            this.setState({
                'user': user,
                'followingArr': user.followingUsers
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
                            return <FollowUser user={user} key={index}/>
                        })
                        : null}
                </div>
            </div>
        )
    }
}
export default FollowingView