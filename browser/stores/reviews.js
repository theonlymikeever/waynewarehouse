import axios from 'axios';

//Actions types
const GET_REVIEWS = 'GET_REVIEWS';

//Actions
const getReviews = (reviews) => {
  return {
    type: GET_REVIEWS,
    reviews
  }
}

//Thunks
export const fetchReviews = () => {
  return (dispatch) => {
    axios.get(`/api/reviews`)
      .then( res => res.data )
      .then( reviews => {
        dispatch(getReviews(reviews))
      })
      .catch(console.log)
  }
}

export const addReviewOnServer = (review) => {
  return (dispatch) => {
    axios.post(`/api/reviews/`, review)
      .then( () => {
        dispatch(fetchReviews()) //to update the store
      })
      .catch(console.log)
  }
}

export const deleteReviewOnServer = (id) => {
  return (dispatch) => {
    axios.delete(`/api/reviews/${id}`)
      .then( () => {
        dispatch(fetchReviews()) // to update the store
      })
      .catch(console.log)
  }
}

//Reducer
export default function (state = [], action) {
  switch (action.type){
    case GET_REVIEWS:
      return action.reviews;
    default:
      return state;
  }
}
