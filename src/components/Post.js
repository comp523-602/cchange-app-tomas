/** @namespace components/Post */

// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';
import Moment from 'moment';
import Authentication from './../modules/Authentication';
import { Link } from 'react-router-dom';
import $ from 'jquery';
class Post extends Component {

  constructor(props) {
	super(props)
  this.state = {
            'campaign': [],
            'user': [],
            'charity': [],
	};
    this.editPost = this.editPost.bind(this);
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

        Requests.makeRequest('charity', {
          'charity': this.props.post.charity
        }, (error, body) => {

            // Get charity from response
            var charity = body.charity;
            if (!charity) return;
            // Add charity to state
            this.setState({
            'charity': charity
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
                {this.props.post && this.props.post.image && this.state.campaign.name && this.state.user.name
                  ? <div>
                      <Link to={"/post/" + this.props.post.guid}>
                        <img src={this.props.post.image} />
                        </Link>
                      <div className="info">
                          <Link to={"/campaign/" + this.props.post.campaign} >
                            <h3 className="campaignText">Campaign: {this.state.campaign.name}</h3>
                          </Link>

                          <Link to={"/charity/" + this.props.post.charity} >
                            <h3 className="charityText">Charity: {this.state.charity.name}</h3>
                          </Link>

						              <Link to={"/post/" + this.props.post.guid} >
                          	<h3>Post: {this.props.post.caption}</h3>
						              </Link>

                          <Link to={"/user/" + this.props.post.user} >
                            <h3 className="userText">User: {this.state.user.name}</h3>
                          </Link>

                          <h3>{Moment(this.props.post.dateCreated*1000).fromNow()}</h3>
						              <h3>{this.props.post.donations.length} donations</h3>
                      </div>
                      { Authentication.getUser() && Authentication.getUser().guid === this.props.post.user
                          ? <p>Edit Post</p>
                          : null }
                    </div>
                  : <div className="loading">Loading Post...</div> }
            </div>
         )
     };
     editPost() {

     }
}
export default Post;
