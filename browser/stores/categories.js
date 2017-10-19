import axios from 'axios';

//actions
const GET_CATEGORIES = 'GET_CATEGORIES';

//action creators

const getCategories = (categories) => {
    return {
        type: GET_CATEGORIES,
        categories
    };
}

//thunks

export const fetchCategories = () => {
    return (dispatch) => {
        axios.get('/api/categories')
            .then(res => res.data)
            .then(categories => {
                dispatch(getCategories(categories));
            }).catch(console.log)
    }
}

//reducer
export default function (state = [], action) {
    switch (action.type) {
        case GET_CATEGORIES:
            return Object.assign([], state, action.categories);

        default:
            return state;
    }
}
