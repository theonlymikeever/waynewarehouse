import axios from 'axios';
import history from '../history';
import {addItem, resetCart, fetchCart} from './cart';

//actions
const SET_CURRENT_USER = 'SET_CURRENT_USER';
const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';
const UPDATE_USER = 'UPDATE_USER';

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

const transferLineItems = (user, cart, history, dispatch) => {
    console.log("user, cart, history, :", user, cart, history)
    dispatch(setCurrentUser(user));
    //pull lineItems from "guestCart"
    const lineItems = cart.lineItems;
    dispatch(resetCart());
    dispatch(fetchCart(user.id*1))
    .then(( cart ) => {
        if (lineItems.length > 0){
            lineItems.forEach((lineItem, index ) => {
                return dispatch(addItem(user.id, lineItem.productId, null, history))
            });
        }
        history.push('/products');
    });
};

export const updateUser = (userId, address) => {
    return (dispatch) => {
        console.log('userId, address:',userId, address )
        axios.put(`/api/users/${userId}`, {address: address})
            .then(res => res.data)
            .then(user => {
                dispatch(fetchUser(user));
            });
    };
};



export const loginActionCreator = (credentials, history, cart) => {
    return (dispatch) => {
        axios.post('/login', credentials)
            .then(results => {
                console.log(results.data.error);    
                return results.data;
            })
            .then(user => {
                if (user.error){
                    dispatch(setCurrentUser(user));
                    return;
                }
                transferLineItems(user, cart, history, dispatch);
            });
    };
};



export const googleLoginActionCreator = (credentials, history, cart) => {
    return (dispatch) => {
        axios.post('/login/google', credentials)
            .then(results => results.data)
            .then(user => {
                transferLineItems(user, cart, history, dispatch);
            });
    };
};

export const logoutActionCreator = (history) => {
    return (dispatch => {
        axios.delete('/login')
            .then(() => {
                dispatch(removeCurrentUser());
                dispatch(resetCart());
                var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut()
                .then(function () {
                    console.log('User signed out.');
                });
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
