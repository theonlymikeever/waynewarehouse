import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../stores/user';
import { fetchProducts } from '../stores/products';
import { fetchCart } from '../stores/cart';
import { fetchCategories } from '../stores/categories'
import { fetchReviews } from '../stores/reviews';

import UserProfile from './UserProfile';
import SignUp from './SignUp';
import Home from './Home';
import Login from './Login';
import NavBar from './NavBar';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import CartList from './CartList';
import OrderConfirmation from './OrderConfirmation';
import Admin from './Admin';

class Main extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {

		this.props.fetchInitialData();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.user.id){
			this.props.getCart(nextProps.user.id);
		}

	}

	render() {
		return (
			<div className='container'>
				<main>
					<NavBar />
					<Switch>
						<Route exact path='/' component={Home} />
						<Route exact path="/products" component={ProductList} />
						<Route exact path='/products/:productId' component={ProductDetail} />
						<Route path='/login' component={Login} />
						<Route exact path='/profile' component={UserProfile} />
						<Route exact path='/signup' component={SignUp} />
						<Route exact path='/orders/:userId/lineItems' component={CartList} />
						<Route exact path='/orders/:orderId/confirmation' component={OrderConfirmation} />
            <Route path='/admin' component={Admin} />            
						<Route component={Home} />
					</Switch>
				</main>
			</div>
		)
	}
}

const mapProps = ({ user }) => {
	return {
		user
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchInitialData: () => {
			dispatch(fetchUser());
			dispatch(fetchProducts())
			dispatch(fetchCategories());
			dispatch(fetchReviews())
		},
		getCart: (userId) => {
			dispatch(fetchCart(userId));
		}
	};
}

export default withRouter(connect(mapProps, mapDispatchToProps)(Main));
