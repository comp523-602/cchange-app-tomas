/** @namespace components/Header */

// Import dependencies
import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Authentication from './../modules/Authentication';

class Header extends Component {

	/**
	 * Creates initial state, binds functions
	 * @memberof components/Header#
	 */
	constructor (props) {
		super(props)
		this.state = {};

		this.renderAuthMenu = this.renderAuthMenu.bind(this);
		this.getVisitorMenu = this.getVisitorMenu.bind(this);
		this.getUserMenu = this.getUserMenu.bind(this);
		this.getCharityUserMenu = this.getCharityUserMenu.bind(this);
	}

	/**
	 * Runs functions once component is ready
	 * @memberof components/Header#
	 */
	componentWillMount () {
		this.renderAuthMenu();
	}

	/**
	 * Renders component
	 * @memberof components/Header#
	 */
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

	/**
	 * Adds auth menu to state based on Authentication status
	 * @memberof components/Header#
	 */
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

	/**
	 * Returns a list of links for visiting users
	 * @memberof components/Header#
	 */
	getVisitorMenu () {
		return (
			<div className="authmenu">
				<NavLink to="/login" activeClassName="active">Login</NavLink>
				<NavLink to="/signup" activeClassName="active">Signup</NavLink>
			</div>
		);
	}

	/**
	 * Returns a list of links for users
	 * @memberof components/Header#
	 */
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

	/**
	 * Returns a list of links for charity users
	 * @memberof components/Header#
	 */
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

	/**
	 * Provides Authentication logout function to component
	 * @memberof components/Header#
	 */
	logout (event) {
		event.preventDefault();
		Authentication.logout();
	}
}

export default Header;