import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './Home';

export default class Main extends Component {
	render(){
		return(
			<div className='container'>
				<main>
					<Switch>
						<Route exact path='/' component={ Home } />
					</Switch>
				</main>
			</div>
		)
	}
}