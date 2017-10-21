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
    axios.get(`/api/reviews/products`)
      .then( res => res.data )
      .then( reviews => {
        dispatch(getReviews(reviews))
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
