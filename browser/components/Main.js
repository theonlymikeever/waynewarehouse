import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../stores/user';
import { fetchProducts } from '../stores/products'

import UserProfile from './UserProfile';
import SignUp from './SignUp';
import Home from './Home';
import Login from './Login';
import NavBar from './NavBar';
import ProductList from './ProductList'

class Main extends Component {
	constructor(props){
		super(props);
	}
	componentDidMount() {
		this.props.fetchInitialData();
	}

	render() {
		return (
			<div className='container'>
				<main>
					<NavBar />
					<Switch>
						<Route exact path='/' component={Home} />
						<Route exact path="/products" component={ ProductList } />
						<Route path='/login' component={Login} />
						<Route exact path='/profile' component={UserProfile} />
						<Route exact path='/signup' component={SignUp} />
						<Route component={Home} />
					</Switch>
				</main>
			</div>
		)
	}
}

const mapProps = ({user}) => {
  return {
    user
  }
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchInitialData: () => {
			dispatch(fetchUser());
			dispatch(fetchProducts())
		}
	};
}

export default withRouter(connect(mapProps, mapDispatchToProps)(Main));
