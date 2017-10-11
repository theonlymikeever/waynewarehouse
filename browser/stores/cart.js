import axios from 'axios';

//Action Types

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const FETCH_ORDER = 'FETCH_ORDER';

//Action Creators

const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    product
  }
}

const removeFromCart = () => {
  return {
    type: REMOVE_FROM_CART
  }
}

const getOrder = (order) => {
  return {
    type: FETCH_ORDER,
    order
  }
}

//Reducer

const reducer = (state = {}, action) => {

}