import axios from 'axios';
import history from '../history';
import {addItem, resetCart, fetchCart} from './cart';

//actions
const SET_CURRENT_USER = 'SET_CURRENT_USER';
const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';

//action creators

const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        user
    };
};

const removeCurrentUser = () => {
    return {
        type: REMOVE_CURRENT_USER,
    };
};


//thunks
export const fetchUser = () => {
    return (dispatch) => {
        axios.get(`/login`)
            .then(res => res.data)
            .then(user => {
                dispatch(setCurrentUser(user));
            }).catch(console.log)
    }
}

export const postUser = (user, history) => {
    return (dispatch) => {
        axios.post('/api/users/signup', user)
            .then(res => res.data)
            .then(user => {
                dispatch(setCurrentUser(user));
                history.push(`/users/${user.id}`);
            }).catch(console.log)
    }
}

export const loginActionCreator = (credentials, history, cart) => {
    return (dispatch) => {
        axios.post('/login', credentials)
            .then(results => {
                return results.data;
            })
            .then(user => {
                dispatch(setCurrentUser(user));
                //pull lineItems from "guestCart"
                const lineItems = cart.lineItems;
                dispatch(resetCart());
                dispatch(fetchCart(user.id*1))
                .then(( cart ) => {
                    if (lineItems.length > 0){
                        lineItems.forEach((lineItem, index ) => {
                            return dispatch(addItem(user.id, lineItem.productId))
                        });
                    }
                    history.push('/products');
                })
            });
    };
};

export const googleLoginActionCreator = (credentials, history, cart) => {
    return (dispatch) => {
        console.log('googleLoginActionCreator thunk')
        axios.post('/login/google', credentials )
            .then(results => results.data)
            .then(user => {
                dispatch(setCurrentUser(user));
                const lineItems = cart.lineItems;
                console.log('users store, cart:', cart)
                if (lineItems.length > 0){
                    lineItems.forEach(lineItem => dispatch(addItem(user.id, lineItem.productId)));
                }
                history.push('/');
            })
    };
};

export const logoutActionCreator = (history) => {
    return (dispatch => {
        axios.delete('/login')
            .then(() => {
                dispatch(removeCurrentUser());
                dispatch(resetCart());
                history.push('/');
            });
    });
};

//reducer
export default function (state = {}, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return Object.assign({}, state, action.user);
        case REMOVE_CURRENT_USER:
            return Object.assign({});
        default:
            return state;
    }
}
