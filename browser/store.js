import { createStore, applyMiddleware, combineReducers } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';


// const store = createStore(reducer, applyMiddleware(thunkMiddleware, createLogger()));
// export default store;
