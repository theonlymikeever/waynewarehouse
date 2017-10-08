import { createStore, applyMiddleware, combineReducers } from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import users from './stores/users';
import user from './stores/user';
import orders from './stores/orders';

const reducer = combineReducers({
    users, user, orders
});

const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}));

const store = createStore(reducer, middleware);

export default store;

