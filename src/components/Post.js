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
      'editing': false,
      'donations': this.props.post.donations.length,
      'buttonText': "Edit Post",
      'caption': this.props.post.caption
  	};
    this.editPost = this.editPost.bind(this, this.props.post.guid);
    this.donate = this.donate.bind(this);
  }

    /**
     * Temporary donate function
     * @memberof components/Post#
     */
     donate(event) {
       var self = this;
       Requests.makeRequest('donation.create', {
         'post': self.props.post.guid,
         'amount': 5,
       }, function (error, body) {
         if(error){
           $("#donateDiv").append("<p>Insufficient funds</p>");
         }
         else{
            var donation = body.donation;
            var post = body.post;
            if (!donation || !post) return;
            self.setState({
              'donations': self.state.donations + 1,
            });
         }

       })

     }

    /**
     * Renders a post with its image, caption, the campaign's name, and the user who posted it
     * @memberof components/Post#
     */
     render() {
         return(
            <div className="item post row">
                {this.props.post && this.props.post.image
                  ? <div>
                      <Link to={"/post/" + this.props.post.guid}>
                        <img src={this.props.post.image} />
                      </Link>
                      <div className="info">
                        <Link to={"/campaign/" + this.props.post.campaign} >
                          <h3 className="campaignText">Campaign: {this.props.post.campaignName}</h3>
                        </Link>

                        <Link to={"/charity/" + this.props.post.charity} >
                          <h3 className={"charityText_" + this.props.post.guid} >Charity: {this.props.post.charityName}</h3>
                        </Link>

                        {!this.state.editing 
                        ?  <h3 className={"postText_" + this.props.post.guid}>Post: {this.state.caption}</h3>
                        : <textarea id="textarea">{this.state.caption}</textarea>
                        }

                        <Link to={"/user/" + this.props.post.user} >
                          <h3 className={"userText_" + this.props.post.guid}>User: {this.props.post.userName}</h3>
                        </Link>

                        <h3>{Moment(this.props.post.dateCreated*1000).fromNow()}</h3>
					              <h3>{this.state.donations} donations</h3>
                        {Authentication.status() === Authentication.USER
                          ? <div id="donateDiv" onClick={this.donate}><button>Donate 5¢</button></div>
                          : null}
                      </div>
                      { Authentication.getUser() && Authentication.getUser().guid === this.props.post.user
                          ? <button id={"editPost_" + this.props.post.guid} onClick={()=> this.editPost(this.props.post.guid)}>{this.state.buttonText}</button>
                          : null }
                    </div>
                  : <div className="loading">Loading Post...</div> }
            </div>
         )
     };

     editPost(postguid) {
          var userguid = Authentication.getUser();
          var self = this;
          var editPostString;
          var previousString = this.props.post.caption;

          if(this.state.editing) {
              //console.log("editing true");
              editPostString = $("#textarea").val();              
              self.setState({
                editing: false,
                buttonText: "Edit Post",
                caption: editPostString
              }, function() {
               // console.log(self.state.editing + " " + this.state.buttonText);
              })
              Requests.makeRequest('post.edit', {
               'post': postguid,
               'caption': editPostString
              }, (error, body) => {
                //returns post object
                var response = body.post;
              });
             
          }

          else {
            this.setState({
              editing: true,
              buttonText: "Done"
              }, function() {
              //console.log(this.state.editing + " " + this.state.buttonText);
              })
            }
      }
}
export default Post;
