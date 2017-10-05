
// Import dependencies
import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

class Home extends Component {
	render() {
		return (
			<header>
				<div className="container">
					<div className="logo">
						<Link to="/">cChange</Link>
					</div>
					<div className="navigation">
						<NavLink to="/campaigns" activeClassName="active">Campaigns</NavLink>
						<NavLink to="/charities" activeClassName="active">Charities</NavLink>
						<NavLink to="/posts" activeClassName="active">Posts</NavLink>
					</div>
					<div className="usermenu">
						<NavLink to="/login" activeClassName="active">Login</NavLink>
						<NavLink to="/signup" activeClassName="active">Signup</NavLink>
					</div>
				</div>
			</header>
		);
  	}
}

export default Home;