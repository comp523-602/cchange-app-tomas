
// Import dependencies
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// Import views
import HomeView from './views/HomeView';
import LoginView from './views/LoginView';
import SignupView from './views/SignupView';
import CharitySignupView from './views/CharitySignupView';
import CampaignsView from './views/CampaignsView';
import CampaignCreateView from './views/CampaignCreateView';
import CharitiesView from './views/CharitiesView';
import PostsView from './views/PostsView';
import UserView from './views/UserView';
import FollowingView from './views/FollowingView';
import CharityView from './views/CharityView';
import CharityEditView from './views/CharityEditView';
import CampaignView from './views/CampaignView';
import CampaignEditView from './views/CampaignEditView';
import UpdateView from './views/UpdateView';
import PostCreateView from './views/PostCreateView';
import PostView from './views/PostView';
import LogoutView from './views/LogoutView';

// Import components
import Header from './components/Header';

class App extends Component {
	render() {
		return (
			<div className="app">
				<Header />
				<div className="view">
					<Route exact path="/" component={HomeView} />
					<Route path="/login" component={LoginView} />
					<Route path="/signup" component={SignupView} />
					<Route path="/charitySignup/:charityToken" component={CharitySignupView} />
					<Route path="/campaigns" component={CampaignsView} />
					<Route path="/charities" component={CharitiesView} />
					<Route path="/posts" component={PostsView} />
					<Route path="/user/:guid" component={UserView} />
					<Route path="/followingView/:guid" component={FollowingView}/>
					<Route path="/charity/:guid" component={CharityView} />
					<Route path="/charityEdit/:guid" component={CharityEditView} />
					<Route path="/campaign/:guid" component={CampaignView} />
					<Route path="/campaignEdit/:guid" component={CampaignEditView} />
					<Route path="/campaignCreate" component={CampaignCreateView} />
					<Route path="/update/:guid" component={UpdateView} />
					<Route path="/post/:guid" component={PostView} />
					<Route path="/postCreate/:guid" component={PostCreateView} />
					<Route path="/logout" component={LogoutView} />
				</div>
			</div>
		);
  	}
}

export default App;
