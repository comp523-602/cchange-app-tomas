/** @namespace views/EditUserView */

// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';
import Form from './../components/Form';
import FormConfigs from './../modules/FormConfigs';

class EditUserView extends Component{
    constructor(props){
        super(props)
        this.state = {
            'userGUID': this.props.match.params.guid
        };
    };
    render() {
        return(
            <div className="container">
                <Form form = {FormConfigs.editUser()} onSuccess={this.onSuccess}/>
            </div>
        )
    }

    onSuccess(response) {
        window.location.href = '/user/'+this.props.match.params.guid;
    }
}
export default EditUserView