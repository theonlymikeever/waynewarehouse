import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import NavBar from './NavBar';

export default class Main extends Component {
	render(){
		return(
			<div className='container'>
				<main>
					<NavBar />
					<Switch>
						<Route exact path='/' component={ Home } />
						<Route path='/login' component={ Login } />
					</Switch>
				</main>
			</div>
		)
	}
}