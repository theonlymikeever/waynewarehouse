import axios from 'axios';

//Actions
const GET_PRODUCTS = 'GET_PRODUCTS';
// const UPDATE_PRODUCT_LIST = 'UPDATE_PRODUCT_LIST';
// const ADD_PRODUCT = 'ADD_PRODUCT';
// const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
// const DELETE_PRODUCT = 'DELETE_PRODUCT';

//Action Creators
const getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products
  }
};

// const updateProductList = (products) => {
//   return {
//     type: UPDATE_PRODUCT_LIST,
//     products
//   }
// };

// const addProduct = (product) => {
//   return {
//     type: ADD_PRODUCT,
//     product
//   }
// };

// const updateProduct = (product) => {
//   return {
//     type: UPDATE_PRODUCT,
//     product
//   }
// };

// const deleteProduct = (product) => {
//   return {
//     type: DELETE_PRODUCT,
//     product
//   }
// };

//Thunks

export const updateProducts = (catArr) => {
  return (dispatch) => {
    console.log('cat', catArr);
    axios.put(`/api/products/updateList`, catArr)
      .then(res => res.data)
      .then(newProducts => {
        dispatch(getProducts(newProducts));
      })
  }
}

export const fetchProducts = () => {
  return (dispatch) => {
    axios.get('/api/products')
      .then(res => res.data)
      .then(products => {
        dispatch(getProducts(products))
      })
      .catch(console.log)
  }
};

export const addProductOnServer = (product) => {
  return (dispatch) => {
    axios.post('/api/products', product)
      .then(() => {
        dispatch(fetchProducts()) //to update our store
      }).catch(console.log)
  }
}

export const deleteProductOnServer = (id) => {
  return (dispatch) => {
    axios.delete(`/api/products/${id}`)
      .then(() => {
        dispatch(fetchProducts()) //to update our store
      }).catch(console.log)
  }
}

export const updateProductOnServer = (id, update) => {
  return (dispatch) => {
    axios.put(`/api/products/${id}`, update)
      .then(() => {
        dispatch(fetchProducts()) //to update our store
      }).catch(console.log)
  }
}

//Reducer
export default function (state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    default:
      return state;
  }
}
