/** @namespace components/Charity */

// Import dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Charity extends Component {

  /**
  * Creates initial props for Charity list element
  * @memberof components/Charity#
  */
  constructor(props) {
    super(props)
  }

  /**
  * Renders Charity element
  * @memberof components/Charity#
  */
  render() {
    return (
      <div className="container">
        <h3><a href={'/charity/' + this.props.charity.guid}>{this.props.charity.name}</a></h3>
        <p>{this.props.charity.description}</p>
        <img src={this.props.charity.logo}/>
      </div>
    )
  }
}

export default Charity;
