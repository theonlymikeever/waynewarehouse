import axios from 'axios';

//Action Types

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const FETCH_CART = 'FETCH_CART';
const CHECKOUT = 'CHECKOUT';

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

const checkOut = (cart) => {
    return {
        type: CHECKOUT,
        cart
    }
}

//Thunks

export const fetchCart = (userId, filter) => {
    
    return (dispatch) => {
        filter === true ?
            axios.get(`/api/orders/filter/${userId}/${filter ? filter : ''}`)
            :
            axios.get(`/api/orders/${userId}`)

                .then(res => res.data)
                .then(cart => {
                    dispatch(getCart(cart))
                })
    }
}

export const addItem = (userId, productId) => {
    return (dispatch) => {
        axios.post(`/api/orders/${userId}/lineItems`, { productId })
            .then(() => {
                dispatch(fetchCart(userId, false));
            })
    }
}

export const deleteLineItem = (userId, productId) => {
    return (dispatch) => {
        axios.delete(`/api/orders/${userId}/lineItems/${productId}`)
            .then(() => {
                dispatch(fetchCart(userId, false));
            })
    }
}

export const checkoutCart = (cartId) => {
    return (dispatch) => {
        axios.put(`/api/orders/${cartId}`)
            .then(() => {
                dispatch(checkOut());
            })
    }
}


//Reducer

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_CART:
            return Object.assign({}, state, action.cart);
        case CHECKOUT:
            return Object.assign({});
        default:
            return state;
    }
}