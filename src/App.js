
// Import dependencies
import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

// Import views
import Home from './views/Home';
import Login from './views/Login';
import Signup from './views/Signup';
import Charity from './views/Charity';

class App extends Component {
	render() {
		return (
			<div className="app">
				<header>
					<div className="container">
						<div className="logo">
							cChange
						</div>
						<div className="navigation">
							<Link to="/">Home</Link>
							<Link to="/login">Login</Link>
							<Link to="/signup">Signup</Link>
							<Link to="/charity">Charity</Link>
						</div>
					</div>
				</header>
				<div className="view">
					<Route exact path="/" component={Home} />
					<Route path="/login" component={Login} />
					<Route path="/signup" component={Signup} />
					<Route path="/charity/:guid" component={Charity} />
				</div>
				<footer>
					<div className="container">
					</div>
				</footer>
			</div>
		);
  	}
}

export default App;