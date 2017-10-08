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
