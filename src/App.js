
// Import dependencies
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// Import views
import HomeView from './views/HomeView';
import SearchView from './views/SearchView';
import LoginView from './views/LoginView';
import SignupView from './views/SignupView';
import CharitySignupView from './views/CharitySignupView';
import UserView from './views/UserView';
import UserAddFundsView from './views/UserAddFundsView';
import UserFollowingView from './views/UserFollowingView';
import CharityView from './views/CharityView';
import CharityEditView from './views/CharityEditView';
import CampaignView from './views/CampaignView';
import CampaignCreateEditView from './views/CampaignCreateEditView';
import UpdateView from './views/UpdateView';
import UpdateCreateEditView from './views/UpdateCreateEditView';
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
					<Route path="/search" component={SearchView} />
					<Route path="/login" component={LoginView} />
					<Route path="/signup" component={SignupView} />
					<Route path="/charitySignup/:charityToken" component={CharitySignupView} />
					<Route path="/user/:guid" component={UserView} />
					<Route path="/userAddFunds/:guid" component={UserAddFundsView} />
					<Route path="/userFollowing/:guid" component={UserFollowingView}/>
					<Route path="/charity/:guid" component={CharityView} />
					<Route path="/charityEdit/:guid" component={CharityEditView} />
					<Route path="/campaign/:guid" component={CampaignView} />
					<Route path="/campaignCreate" component={CampaignCreateEditView} />
					<Route path="/campaignEdit/:guid" component={CampaignCreateEditView} />
					<Route path="/update/:guid" component={UpdateView} />
					<Route path="/updateCreate" component={UpdateCreateEditView} />
					<Route path="/updateEdit/:guid" component={UpdateCreateEditView} />
					<Route path="/post/:guid" component={PostView} />
					<Route path="/postCreate/:guid" component={PostCreateView} />
					<Route path="/logout" component={LogoutView} />
				</div>
			</div>
		);
  	}
}

export default App;
