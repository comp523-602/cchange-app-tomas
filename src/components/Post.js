/** @namespace components/Campaign */

// Import dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Post extends Component {

    /**
     * Renders Post element
     * @memberof components/Post#
     */
    componentWillMount() {
        console.log(this.props.post);        
    }
     render() {
         return(
           <Link to={'/post/' + this.props.post.guid}>
            <div className="item post row">
                {this.props.post.image
                    ? <img src={this.props.post.image} />
                    : null}
                <div className="info">
                    <h3>{this.props.post.campaign}</h3>
                    <h3>{this.props.post.caption}</h3>
                </div>
            </div>
           </Link>
         )
     }
}

export default Post;