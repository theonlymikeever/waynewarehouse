import axios from 'axios';

// Actions
const GET_CATEGORIES = "GET_CATEGORIES";

// Action Creators
const getCategories = (categories) => {
  return {
    type: GET_CATEGORIES,
    categories
  }
}

// Thunks
export const fetchCategories = () => {
  return (dispatch) => {
    axios.get('/api/categories')
      .then(res => res.data)
      .then(categories => {
        dispatch(getCategories(categories))
      })
      .catch(console.log)
  }
}

export const addCategoryOnServer = (category) => {
  return (dispatch) => {
    axios.post('/api/categories', category)
      .then(() =>{
        dispatch(fetchCategories())
      })
      .catch(console.log);
  }
}

export const deleteCategoryOnServer = (catId) => {
  return (dispatch) => {
    axios.delete(`/api/categories/${catId}`)
      .then(() => {
        dispatch(fetchCategories())
      })
      .catch(console.log)
  }
}

// Reducer
export default function (state=[], action){
  switch(action.type){
    case GET_CATEGORIES:
      return action.categories
    default: 
      return state;
  }
}