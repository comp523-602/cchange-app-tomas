/** @namespace components/Header */

// Import dependencies
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Authentication from './../modules/Authentication';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

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

		// Setup update event listener
		var self = this;
		document.addEventListener('updateUser', function () {
			self.renderAuthMenu();
		}, false);
	}

	/**
	 * Renders component
	 * @memberof components/Header#
	 */
	render() {
		return (
			<Navbar inverse collapseOnSelect>
				<Navbar.Header>
					<LinkContainer exact to="/">
						<Navbar.Brand>
							cChange
						</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav>
						<LinkContainer to="/search">
							<NavItem eventKey={1}>Browse & Search</NavItem>
						</LinkContainer>
					</Nav>
					{this.state.authmenu}
				</Navbar.Collapse>
			</Navbar>
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
			<Nav pullRight>
				<LinkContainer to="/login"><NavItem eventKey={1}>Login</NavItem></LinkContainer>
				<LinkContainer to="/signup"><NavItem eventKey={2}>Signup</NavItem></LinkContainer>
			</Nav>
		);
	}

	/**
	 * Returns a list of links for users
	 * @memberof components/Header#
	 */
	getUserMenu (user) {
		return (
			<Nav pullRight>
				<LinkContainer to={"/user/"+user.guid}><NavItem eventKey={1}>{" " + user.name}</NavItem></LinkContainer>
				<LinkContainer to={"/userAddFunds"}><NavItem eventKey={2}>{this.returnBalance(user.balance)}</NavItem></LinkContainer>
				<NavItem eventKey={3} onClick={this.logout}>Log out</NavItem>
			</Nav>
		);
	}

	/**
	 * Returns a list of links for charity users
	 * @memberof components/Header#
	 */
	getCharityUserMenu (user) {
		return (
			<Nav pullRight>
				<LinkContainer to={"/charity/"+user.charity}><NavItem eventKey={1}>{user.charityName}</NavItem></LinkContainer>
				<NavItem eventKey={2} onClick={this.logout}>Log out</NavItem>
			</Nav>
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
	returnBalance(balance) {
		return "$" + (balance/100).toFixed(2);
	}
}

export default Header;
