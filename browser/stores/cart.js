import axios from 'axios';

//Action Types

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const FETCH_CART = 'FETCH_CART';
const CHECKOUT = 'CHECKOUT';
const ADD_TO_GUEST_CART = 'ADD_TO_GUEST_CART';
const REMOVE_FROM_GUEST_CART = 'REMOVE_FROM_GUEST_CART';
const RESET_CART = 'RESET_CART';

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

const addToGuestCart = (lineItem) => {
    return {
        type: ADD_TO_GUEST_CART,
        lineItem
    }
}

const removeFromGuestCart = (index) => {
    return {
        type: REMOVE_FROM_GUEST_CART,
        index
    }
}

export const resetCart = () => {
    console.log('reset Cart******')
    return {
        type: RESET_CART
    }
}

//Thunks

export const fetchCart = (userId) => {    
    return (dispatch) => {
        return axios.get(`/api/orders/${userId}`)
        .then(res => {
          return res.data;  
        } )
        .then(cart => {
            dispatch(getCart(cart));
            return cart;
        });
    };
};

// cart param is optional.  Only used by guestCart.
export const addItem = (userId, productId, cart, history) => {
    return (dispatch) => {
        if (userId !== 0){
            return axios.post(`/api/orders/${userId}/lineItems`, { productId })
                .then(() => {
                    history.push('/products');
                    return dispatch(fetchCart(userId*1));
                })
        } else {
            // for non-logged in user (guestCart)
            axios.get(`/api/products/${productId}`)
            .then((results) => results.data)
            .then(product => {
                const id = cart.lineItems.length || 0;
                const guestLineItem = {
                    id: id,
                    orderId: 0,
                    price: product.price,
                    product: product,
                    productId: product.id,
                    quantity: 1
                }
                dispatch(addToGuestCart(guestLineItem));
                history.push('/products');
            })
        }

    }
}

export const deleteLineItem = (userId, productId, index) => {
    return (dispatch) => {
        if (userId !== 0) {
            axios.delete(`/api/orders/${userId}/lineItems/${productId}`)
                .then(() => {
                    dispatch(fetchCart(userId, false));
                })            
        } else {
            console.log("delete from guest Cart: index:", index)
            dispatch(removeFromGuestCart(index));
        }

    }
}

export const checkoutCart = (userId, cartId, address) => {
    console.log(address)
    return (dispatch) => {
        Promise.all([
            axios.put(`/api/orders/${cartId}`, address),
            axios.put(`/api/orders/${userId}/emptyCart`)
        ])
            .then(() => {
                dispatch(checkOut());
                dispatch(resetCart());
            })
    }
}


//Reducer

const initialState = {
    id: 0, 
    userId: 0, 
    lineItems: [], 
    isCart: true,
    shippingPrice: null,
    tax: null,
    total: null, 
    weight: null    
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_CART:
            return Object.assign({}, state, action.cart);
        case CHECKOUT:
            return Object.assign({});
        case ADD_TO_GUEST_CART:
            return Object.assign({}, state, {lineItems: [...state.lineItems, action.lineItem]});
        case REMOVE_FROM_GUEST_CART:
            const nuLineItems = state.lineItems.filter((item, index) => index !== action.index);
            return Object.assign({}, state, {lineItems: nuLineItems});
        case RESET_CART:
            return Object.assign({}, initialState)

        default:
            return state;
    }
}