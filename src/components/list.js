import React, { Component } from 'react';
class Field extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: this.props.field.value,
        }
    }

    render() {
        return (
            <div className = "list">
                
            </div>
        )
    }
}