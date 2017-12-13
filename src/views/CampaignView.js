/** @namespace views/CampaignView */

// Import dependencies
import React, { Component } from 'react';
import Requests from './../modules/Requests';
import Authentication from './../modules/Authentication';
import { Link } from 'react-router-dom';
import FormConfigs from './../modules/FormConfigs';
import Form from './../components/Form';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import List from './../components/List';
import ReactModal from 'react-modal';

class CampaignView extends Component {

	/**
	* Creates initial props
	* @memberof views/CampaignView#
	*/
	constructor(props) {
		super(props)
		this.state = {
			'user': Authentication.getUser(),
			'showModal': false,
		};
		this.handleOpenModal = this.handleOpenModal.bind(this);
    	this.handleCloseModal = this.handleCloseModal.bind(this);
	}

	/**
	* Gets campaign object, updates state with campaign object
	* Also gets post objects made to this campaign
	* @memberof views/CampaignView#
	*/
	componentWillMount(newProps) {

		// Get campaign GUID from props
		var campaignGUID = null;
		if (newProps) campaignGUID = newProps.match.params.guid;
		else campaignGUID = this.props.match.params.guid;

		// Get campaign from server
		Requests.makeRequest('list.single', {
			'type': "campaign",
			'guid': campaignGUID
		}, (error, body) => {
			// Get campaign from response
			var campaign = body.object;
			if (!campaign) return;
			// Add campaign to state
			this.setState({
				'campaign': campaign,
			});
		})
	}
	componentWillReceiveProps(newProps) {
		this.componentWillMount(newProps);
	}
	/**
	 * Renders the campaign information and renders all of the posts made to this campaign
	 * @memberof views/CampaignView#
 	*/
	render() {
		return (
			<div>
				<div className="gray heading campaign">
					{ this.state.campaign && this.state.campaign.pictures && this.state.campaign.pictures.length
						? <div className="bg" style={{backgroundImage:"url("+this.state.campaign.pictures[0]+")"}}></div>
						: null}
					<div className="container">
						{ this.state.campaign
							? (
								<div>
									<Link to={"/charity/"+this.state.campaign.charity}><p>{this.state.campaign.charityName}</p></Link>
									<h1>{this.state.campaign.name}</h1>
									{ this.state.campaign.description
										? <p>{this.state.campaign.description}</p>
										: null}
									{ this.state.campaign.category
										? <span className="category">{this.state.campaign.category}</span>
										: null}
								</div>
							)
							: <div className="loading">Loading...</div> }
						{ this.state.user && this.state.campaign && this.state.user.charity === this.state.campaign.charity
							? <div>
									<Link to={"/campaignEdit/"+this.props.match.params.guid}><button>Edit</button></Link>
								</div>
							: null }
						{ this.state.user && this.state.campaign && Authentication.status() === Authentication.USER
							? <div>
									<Link to={'/postCreate/' + this.props.match.params.guid}><button>Support with a post</button></Link>
									<button onClick={this.handleOpenModal}>Donate</button>
								</div>
							: null}
					</div>
				</div>
				<Tabs>
					<div className="gray tabsection"><div className="container">
						<TabList>
							<Tab>Posts</Tab>
							<Tab>Donations</Tab>
							<Tab>Pictures</Tab>
						</TabList>
					</div></div>
					<div className="container">
						<TabPanel>
							<List config={{address: 'list.type',
								params: {type: "post", campaign: this.props.match.params.guid}}} />
						</TabPanel>
						<TabPanel>
							<List config={{address: 'list.type',
								params: {type: "donation", campaign: this.props.match.params.guid}}} />
						</TabPanel>
						<TabPanel>
							<div className="gallery">
								{ this.state.campaign && this.state.campaign.pictures.length
									? this.state.campaign.pictures.map((picture, index) => {
										return <img src={picture} key={index} alt={this.state.campaign.name} />;
									}) : null}
							</div>
						</TabPanel>
					</div>
				</Tabs>
				{ this.state.campaign
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
			    			<Form form={FormConfigs.donation(this.state.campaign.name, 'campaign', this.props.match.params.guid)} onSuccess={this.handleCloseModal} />
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

export default CampaignView;
