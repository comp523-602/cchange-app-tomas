/** @namespace components/Post */

// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';
import Moment from 'moment';

class Post extends Component {

    constructor(props) {
	super(props)
	this.state = {
            'campaign': [],
            'user': []
	};

    }
    /**
     * Gets a Post based on a campaign and gets the user's name
     * who made the post
     * @memberof components/Post#
     */
    componentWillMount() {

        Requests.makeRequest('campaign', {
          'campaign': this.props.post.campaign
        }, (error, body) => {

          // Get campaign from response
          var campaign = body.campaign;
          if (!campaign) return;

          // Add campaign to state
          this.setState({
           'campaign': campaign
          });
        })

        Requests.makeRequest('user', {
        	'user': this.props.post.user
        }, (error, body) => {

            // Get campaign from response
            var user = body.user;
	          if (!user) return;
	          // Add campaign to state
            this.setState({
		        'user': user
	      });
	})
    }
    /**
     * Renders a post with its image, caption, the campaign's name, and the user who posted it
     * @memberof components/Post#
     */
     render() {
         return(
            <div className="item post row">
                {this.props.post.image
                    ? <img src={this.props.post.image} />
                    : null}
                <div className="info">
                    <h3>Campaign: {this.state.campaign.name}</h3>
                    <h3>Post: {this.props.post.caption}</h3>
                    <h3>User: {this.state.user.name}, {Moment(this.props.post.dateCreated*1000).fromNow()}</h3>
                </div>
            </div>
         )
     }
}

export default Post;
