
// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';
import Post from './../components/Post';

class PostsView extends Component {

	/**
	 * Creates initial state with null values
	 * @memberof views/PostsView#
	 */

	 constructor(props) {
		 super(props) 
			 this.state = {
				 'posts': []
			 };
	}
	
	/**
	 * Gets list of posts
	 * @memberof views/PostView#
	 */
	componentWillMount() {
		Requests.makeRequest('posts',{
			'pageSize': 20
		}, (error, body) => {
			var posts = body.posts;
			if(!posts) return;

			this.setState({
				'posts': body.posts
			});
		}
	)}
	 
	/**
	 * Renders all posts based on the chosen criteria
	 * @memberof views/PostsView#
	 */
	render() {
		return (
			<div className="container ">
				<h1 className="row">Posts</h1>
				{ this.state.posts[0]
					? this.state.posts.map((post, index) => {
							return <Post post={post} key={index}/>
					})
					: <div className="loading">Loading...</div> }				
			</div>
		);
  	}
}

export default PostsView;
