/** @namespace views/AddFundsView */

// Import dependencies
import React, { Component } from 'react';
import FormConfigs from './../modules/FormConfigs';
import Form from './../components/Form';

class AddFundsView extends Component {

    render() {
        return(
            <div className="container">
				<h2 className="row">Add funds to your account</h2>
                <Form form={FormConfigs.addFunds()} onSuccess={this.onSuccess} />
            </div>
        );
    }

    onSuccess(response) {
        window.location.href = '/user/' + response.user.guid;
    }
}

export default AddFundsView;