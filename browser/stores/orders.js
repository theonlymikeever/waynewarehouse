import axios from 'axios';

// haven't tested this code yet!

// ACTION TYPES
const GET_ORDERS = 'GET_ORDERS';


// ACTION CREATORS
const getOrders = (orders) => {
  return { type: GET_ORDERS, orders }
}


// THUNK CREATORS
export const fetchOrders = () => {
  return (dispatch) => {
    axios.get('/api/orders')
      .then(res => res.data)
      .then(orders => {
        dispatch(getOrders(orders));
      })
      .catch(console.log)
  }
}

export const deleteOrder = (orderId) => {
  return (dispatch) => {
    axios.delete(`/api/orders/${orderId}`)
      .then(() => {
        dispatch(fetchOrders());
      })
      .catch(console.log)
  }
}

export const updateOrder = (orderId, orderUpdate) => {
  return (dispatch) => {
    axios.put(`/api/orders/${orderId}`, orderUpdate)
      .then(res => res.data)
      .then(updatedOrder => {
        dispatch(getOrders())
      })
      .catch(console.log)
  }
}


// REDUCERS
const reducer = (state = [], action) => {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders;

    default:
      return state;
  }
}

export default reducer;

