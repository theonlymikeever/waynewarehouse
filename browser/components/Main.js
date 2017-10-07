import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchUsers } from '../stores/users';

import UserProfile from './UserProfile';
import SignUp from './SignUp';


import Home from './Home';

class Main extends Component {

	componentDidMount() {
		this.props.fetchInitialData();
	}

	render() {
		return (
			<div className='container'>
				<main>
					<Switch>
						<Route exact path='/' component={Home} />
						<Route exact path='/users/:userId' component={UserProfile} />
						<Route exact path='/signup' component={SignUp} />
					</Switch>
				</main>
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchInitialData: () => {
			dispatch(fetchUsers());
		}
	};
}

export default withRouter(connect(null, mapDispatchToProps)(Main));
