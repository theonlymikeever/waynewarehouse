import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import UserProfile from './UserProfile';
import { fetchUsers } from '../stores/users';


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

export default connect(null, mapDispatchToProps)(Main);