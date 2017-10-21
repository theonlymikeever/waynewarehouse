import axios from 'axios';

// haven't tested this code yet!

// ACTION TYPES
const GET_ORDERS = 'GET_ORDERS',
  DELETE_ORDER = 'DELETE_ORDER',
  GET_ORDER = 'GET_ORDER';


// ACTION CREATORS
const getOrders = (orders) => {
  return { type: GET_ORDERS, orders }
}

const deleteOrderById = (orderId) => {
  return { type: DELETE_ORDER, orderId }
}

const getOrder = (order) => {
  return { type: GET_ORDER, order }
}

// THUNK CREATORS
export const fetchOrders = (orders) => {
  return function thunk(dispatch) {
    return axios.get('/api/orders')
      .then(res => res.data)
      .then(orders => {
        dispatch(getOrders(orders));
      })
  }
}

export const fetchOrder = (id) => {
  console.log('fetch', id)
  return function thunk(dispatch) {
    return axios.get(`/api/orders/${id}`)
      .then(res => res.data)
      .then(order => {
        dispatch(getOrder(order));
      })
  }
}

export const deleteOrder = (orderId) => {
  return function thunk(dispatch) {
    return axios.delete(`/api/orders/${orderId}`)
      .then(res => res.data)
      .then(order => {
        dispatch(deleteOrderById(orderId));
      })
  }

}


// REDUCERS
const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders;

    case DELETE_ORDER:
      const orders = state.orders.filter(function (order) {
        return order.id !== action.orderId;
      })
      return Object.assign({}, state, { orders: orders });

    case GET_ORDER:
      return action.order;
    default:
      return state;
  }
}

export default reducer;

