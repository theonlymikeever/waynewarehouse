import { createStore, applyMiddleware, combineReducers } from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import users from './stores/users';
import user from './stores/user';
import products from './stores/products';
import orders from './stores/orders';
import cart from './stores/cart';
import reviews from './stores/reviews';

const reducer = combineReducers({
    users, user, products, orders, cart, reviews
});

const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}));

const store = createStore(reducer, middleware);

export default store;

