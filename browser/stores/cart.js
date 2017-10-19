import axios from 'axios';

//Action Types

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const FETCH_CART = 'FETCH_CART';
const CHECKOUT = 'CHECKOUT';
const ADD_TO_GUEST_CART = 'ADD_TO_GUEST_CART';

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

const addToGuestCart = (productId) => {
    return {
        type: ADD_TO_GUEST_CART,
        productId
    }
}

//Thunks

export const fetchCart = (userId, filter) => {
    
    return (dispatch) => {
        //prevents building additional cart after checkout
        filter === true ?
            axios.get(`/api/orders/${userId}/${filter ? filter : ''}`)
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
        if (userId !== 0){
            axios.post(`/api/orders/${userId}/lineItems`, { productId })
                .then(() => {
                    dispatch(fetchCart(userId, false));
                })
        } else {
            console.log("build guest cart")
            dispatch(addToGuestCart(productId))
        }

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

export default function (state = {lineItems: []}, action) {
    switch (action.type) {
        case FETCH_CART:
            return Object.assign({}, state, action.cart);
        case CHECKOUT:
            return Object.assign({});
        case ADD_TO_GUEST_CART:
            return Object.assign({id: 0, userId: 0}, state, {lineItems: state.lineItems.push(action.productId) })
        default:
            return state;
    }
}