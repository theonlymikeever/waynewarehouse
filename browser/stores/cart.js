import axios from 'axios';

//Action Types

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const FETCH_CART = 'FETCH_CART';

//Action Creators

const addToCart = () => {
    return {
        type: ADD_TO_CART,
    }
}

const removeFromCart = () => {
    return {
        type: REMOVE_FROM_CART,
    }
}

const getCart = (cart) => {
    return {
        type: FETCH_CART,
        cart
    }
}

//Thunks

export const fetchCart = (userId) => {
    return (dispatch) => {
        axios.get(`/api/orders/${userId}`)
            .then(res => res.data)
            .then(cart => {
                dispatch(getCart(cart))
            })
    }
}

export const addItem = (userId, productId) => {
    return () => {
        axios.post(`/api/orders/${userId}/lineItems`, { productId })
            .then(() => {
                fetchCart(userId);
            })
    }
}

export const deleteLineItem = (userId, productId) => {
    return () => {
        axios.delete(`/api/orders/${userId}/lineItems`, { productId })
            .then(() => {
                fetchCart(userId);
            })
    }
}


//Reducer

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_CART:
            return Object.assign({}, state, state.cart);
        default:
            return state;
    }
}