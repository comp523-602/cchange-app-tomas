
// Import dependencies
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

// Import views
import Home from './views/Home';
import Login from './views/Login';
import Signup from './views/Signup';
import Charity from './views/Charity';

// Import components
import Header from './components/Header';

class App extends Component {
	render() {
		return (
			<div className="app">
				<Header />
				<div className="view">
					<Route exact path="/" component={Home} />
					<Route path="/login" component={Login} />
					<Route path="/signup" component={Signup} />
					<Route path="/charity/:guid" component={Charity} />
				</div>
			</div>
		);
  	}
}

export default App;