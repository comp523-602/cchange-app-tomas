/** @namespace views/UserEditView */

// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';
import Form from './../components/Form';
import FormConfigs from './../modules/FormConfigs';

class UserEditView extends Component{

	/**
	 * Constructs view
	 * @memberOf views/UserEditView#
	 */
    constructor(props){
        super(props)
        this.state = {
            'userForm': null,
        };
		this.onSuccess = this.onSuccess.bind(this);
    };

	/**
	 * Gets User object
	 * @memberOf views/UserEditView#
	 */
	 componentWillMount(newProps) {

		 // Get user GUID from props
	   var userGUID = null;
	   if (newProps) userGUID = newProps.match.params.guid;
	   else userGUID = this.props.match.params.guid;

		 if (userGUID) {
			 var self = this;
			 Requests.makeRequest('list.single', {
				 'type': "user",
				 'guid': userGUID
			 }, function(error, body) {
				 var user = body.object;

				 var userForm = FormConfigs.userEdit();
				 userForm.fields.name.value = user.name;
				 userForm.fields.bio.value = user.bio;
				 userForm.fields.picture.value = user.picture;

				 self.setState({
					 'userForm': userForm
				 });
			 })
		 }
	 }

    render() {
        return(
            <div className="container">
				{ this.state.userForm
					? <Form form={this.state.userForm} onSuccess={this.onSuccess} />
					: <div className="loading">Loading...</div> }
            </div>
        )
    }

    onSuccess(response) {
        window.location.href = '/user/'+this.props.match.params.guid;
    }
}
export default UserEditView