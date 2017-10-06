
// Import dependencies
import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Authentication from './../modules/Authentication';

class Header extends Component {

	constructor (props) {
		super(props)
		this.state = {};

		this.renderAuthMenu = this.renderAuthMenu.bind(this);
		this.getVisitorMenu = this.getVisitorMenu.bind(this);
		this.getUserMenu = this.getUserMenu.bind(this);
		this.getCharityUserMenu = this.getCharityUserMenu.bind(this);
	}

	componentWillMount () {
		this.renderAuthMenu();
	}

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
					{this.state.authmenu}
				</div>
			</header>
		);
  	}

	renderAuthMenu () {
		var user = Authentication.getUser();
		if (!user) this.setState({
			authmenu: this.getVisitorMenu()
		})
		else if (user.charity) this.setState({
			authmenu: this.getCharityUserMenu(user)
		})
		else this.setState({
			authmenu: this.getUserMenu(user)
		})
	}

	getVisitorMenu () {
		return (
			<div className="authmenu">
				<NavLink to="/login" activeClassName="active">Login</NavLink>
				<NavLink to="/signup" activeClassName="active">Signup</NavLink>
			</div>
		);
	}

	getUserMenu (user) {
		var profile = "/user/"+user.guid;
		return (
			<div className="authmenu">
				<span>{user.name}</span>
				<NavLink to={profile} activeClassName="active">My Profile</NavLink>
				<a onClick={this.logout}>Log out</a>
			</div>
		);
	}

	getCharityUserMenu (user) {
		var charity = "/charity/"+user.charity;
		return (
			<div className="authmenu">
				<span>{user.name}</span>
				<NavLink to={charity} activeClassName="active">My Charity</NavLink>
				<a onClick={this.logout}>Log out</a>
			</div>
		);
	}

	logout (event) {
		event.preventDefault();
		Authentication.logout();
	}
}

export default Header;