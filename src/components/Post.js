/** @namespace components/Campaign */

// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';

class Post extends Component {
    
    constructor(props) {
		super(props)
		this.state = {
			//TODO: edit charity
			'campaign': []
		};
		
	}
    /**
     * Gets a Post based on a campaign
     * @memberof components/Post#
     */
    componentWillMount() {
        console.log(this.props.post); 

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
    }
    /**
     * Renders a post with its image, caption, and the campaign's name 
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
                </div>
            </div>
         )
     }
}

export default Post;