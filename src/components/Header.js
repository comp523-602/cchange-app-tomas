/** @namespace components/Header */

// Import dependencies
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Authentication from './../modules/Authentication';
import Format from './../modules/Format';
import $ from 'jquery';

class Header extends Component {

	/**
	 * Creates initial state, binds functions
	 * @memberof components/Header#
	 */
	constructor (props) {
		super(props)
		this.state = {
			'user': Authentication.getUser(),
		};

		this.renderAuthMenu = this.renderAuthMenu.bind(this);
		this.getVisitorMenu = this.getVisitorMenu.bind(this);
		this.getUserMenu = this.getUserMenu.bind(this);
		this.getCharityUserMenu = this.getCharityUserMenu.bind(this);
		this.openMenu = this.openMenu.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
	}

	/**
	 * Runs functions once component is ready
	 * @memberof components/Header#
	 */
	componentWillMount () {
		this.renderAuthMenu();
		this.setState({'user': Authentication.getUser()});

		var self = this;
		document.addEventListener('updateUser', function () {
			self.renderAuthMenu();
			self.setState({'user': Authentication.getUser()});
		}, false);
	}

	openMenu () {
		if ($("#control").hasClass("show")) {
			return this.closeMenu();
		}
		$("#control").addClass("show");
		$("#underlay").addClass("show");
	}

	closeMenu() {
		$("#control").removeClass("show");
		$("#underlay").removeClass("show");
	}

	/**
	 * Renders component
	 * @memberof components/Header#
	 */
	render() {
		return (
			<header>
				<div className="container">
					<div id="logo"><NavLink exact to="/" activeClassName="active">¢Change</NavLink></div>
					<div id="control" onClick={this.closeMenu}>
						<div className="navigation">
							<NavLink to="/search" activeClassName="active">Browse & Search</NavLink>
						</div>
						{this.state.authmenu}
					</div>
					<div id="mobile">
						{ this.state.user && !this.state.user.charity
							? <NavLink to={"/userAddFunds"} activeClassName="active">{Format.currency(this.state.user.balance)}</NavLink>
							: null}
						<div id="open" onClick={this.openMenu}></div>
						<div id="underlay" onClick={this.closeMenu}></div>
					</div>
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
				<NavLink to="/signup" activeClassName="active">Sign Up</NavLink>
			</div>
		);
	}

	/**
	 * Returns a list of links for users
	 * @memberof components/Header#
	 */
	getUserMenu (user) {
		return (
			<div className="authmenu">
				<NavLink to={"/user/"+user.guid} activeClassName="active">{" " + user.name}</NavLink>
				<NavLink to={"/userAddFunds"} activeClassName="active">{Format.currency(this.state.user.balance)}</NavLink>
				<a onClick={this.logout}>Log out</a>
			</div>
		);
	}

	/**
	 * Returns a list of links for charity users
	 * @memberof components/Header#
	 */
	getCharityUserMenu (user) {
		return (
			<div className="authmenu">
				<NavLink to={"/charity/"+user.charity} activeClassName="active">{user.charityName}</NavLink>
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