/** @namespace views/CharityView */

// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';
import { Link } from 'react-router-dom';
import Authentication from './../modules/Authentication';
import FormConfigs from './../modules/FormConfigs';
import Form from './../components/Form';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import List from './../components/List';
import ReactModal from 'react-modal';

class CharityView extends Component {

	/**
	 * Creates initial state with null values
	 * @memberof views/CharityView#
	 */
	constructor(props) {
		super(props)
		this.state = {
			'user': Authentication.getUser(),
		};
		this.follow = this.follow.bind(this);
		this.unfollow = this.unfollow.bind(this);
		this.handleOpenModal = this.handleOpenModal.bind(this);
    	this.handleCloseModal = this.handleCloseModal.bind(this);
	}

	/**
	 * Gets charity object, updates state with charity object
	 * @memberof views/CharityView#
	 */
	componentWillMount (newProps) {

		// Get charity GUID from props
		var charityGUID = null;
		if (newProps) charityGUID = newProps.match.params.guid;
		else charityGUID = this.props.match.params.guid;

		// Get charity from server
		Requests.makeRequest('list.single', {
			'type': "charity",
			'guid': charityGUID
		}, (error, body) => {

			// Get charity from response
			var charity = body.object;
			if (!charity) return;

			// Add charity to state
			this.setState({
				'charity': charity,
			})
		})
	}

	componentWillReceiveProps(newProps) {
		this.componentWillMount(newProps);
	}

	/**
	 * Follows charity for User
	 * @memberof views/CharityView#
	 */
	 follow() {
	 	Requests.makeRequest('user.followCharity', {
		 	'charity': this.props.match.params.guid,
		}, (error, body) => {
			var charity = body.charity;
			if (charity) this.setState({
				'charity': charity
			});
		})
	 }

	 /**
 	 * Unfollows charity for user
 	 * @memberof views/CharityView#
 	 */
	 unfollow() {
		 Requests.makeRequest('user.unfollowCharity', {
			 	'charity': this.props.match.params.guid,
			}, (error, body) => {
				var charity = body.charity;
				if (charity) this.setState({
					'charity': charity
				});
			})
	 }

	/**
	 * Renders view
	 * @memberof views/CharityView#
	 */
	render() {
		return (
			<div>
				<div className="gray heading"><div className="container">
						{ this.state.charity
							? (
								<div>
									{ this.state.charity.logo
										? <img src={this.state.charity.logo} alt={this.state.charity.name} />
										: null}
									<h1>{this.state.charity.name}</h1>
									{ this.state.charity.description
										? <p>{this.state.charity.description}</p>
										: null}
									{ this.state.charity.categories.length
										? this.state.charity.categories.map((category, index) => {
											return <span className="category" key={index}>{category}</span>;
										}) : null}
								</div>
							)
							: <div className="loading">Loading...</div> }
						{ this.state.user && this.state.user.charity === this.props.match.params.guid
							&& this.state.charity
							? <div>
									<Link to="/campaignCreate"><button>Create a campaign</button></Link>
									<Link to="/updateCreate"><button>Create an update</button></Link>
									<Link to={"/charityEdit/"+this.state.charity.guid}><button>Edit charity</button></Link>
								</div>
							: null }
						{ this.state.charity && this.state.user && Authentication.status() === Authentication.USER
							? <div>
									{ this.state.charity.currentUserFollows
										? <button onClick={this.unfollow}>Unfollow</button>
										: <button onClick={this.follow}>Follow</button> }
									<button onClick={this.handleOpenModal}>Donate</button>
								</div>
							: null}
				</div></div>
				<Tabs>
					<div className="gray tabsection"><div className="container">
						<TabList>
							<Tab>Campaigns</Tab>
							<Tab>Updates</Tab>
							<Tab>Donations</Tab>
							<Tab>Followers</Tab>
						</TabList>
					</div></div>
					<div className="container">
						<TabPanel>
							<List config={{address: 'list.type',
								params: {type: "campaign", charity: this.props.match.params.guid}}} />
						</TabPanel>
						<TabPanel>
							<List config={{address: 'list.type',
								params: {type: "update", charity: this.props.match.params.guid}}} />
						</TabPanel>
						<TabPanel>
							<List config={{address: 'list.type',
								params: {type: "donation", charity: this.props.match.params.guid}}} />
						</TabPanel>
						<TabPanel>
							<List config={{address: 'list.followers',
								params: {charity: this.props.match.params.guid}}} />
						</TabPanel>
					</div>
				</Tabs>
				{ this.state.charity
					? <ReactModal
						style={{
						  overlay: {
						    position          : 'fixed',
						    top               : 0,
						    left              : 0,
						    right             : 0,
						    bottom            : 0,
						    backgroundColor   : 'rgba(0,0,0,0.8)'
						  },
						  content: {
						    position                   : 'absolute',
						    top                        : '80px',
							bottom					   : 'auto',
						    left                       : '50%',
						    marginLeft                 : '-180px',
							width					   : '320px',
						    boxShadow                  : '0px 0px 6px rgba(0,0,0,0.5)',
						    background                 : '#fff',
						    borderRadius               : '4px',
						    padding                    : '0px 20px 30px'
						  }
					  	}}
						ariaHideApp={false}
			        	isOpen={this.state.showModal}
			        	onRequestClose={this.handleCloseModal}
			        	shouldCloseOnOverlayClick={true}>
			    			<Form form={FormConfigs.donation(this.state.charity.name, 'charity', this.props.match.params.guid)} onSuccess={this.handleCloseModal} />
			        </ReactModal>
					: null}
			</div>
		)
  	}

	handleOpenModal () {
		this.setState({'showModal':true});
	}

	handleCloseModal () {
		this.setState({'showModal':false});
	}
}

export default CharityView;
