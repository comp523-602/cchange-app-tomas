/** @namespace views/AddFundsView */

// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';
import Authentication from './../modules/Authentication';
import FormConfigs from './../modules/FormConfigs';
import Form from './../components/Form';

class AddFundsView extends Component {
    constructor(props) {
        super(props)
        this.state ={
            'user': null
        }
    }

    componentWillMount(newProps) {
        // Get user GUID from props
		var userGUID = null;
		if (newProps) userGUID = newProps.match.params.guid;
        else userGUID = this.props.match.params.guid;
        console.log(userGUID);
        this.setState({
            'user': userGUID
        }, function(){
            return;
        })
    }

    render() {
        return(
            <div className="container">
                <Form form={FormConfigs.addFunds()} onSuccess={this.onSuccess} />
            </div>
        );
    }
    onSuccess(response) {
        window.location.href = '/user/' + response.user.guid;
    }
}

export default AddFundsView;