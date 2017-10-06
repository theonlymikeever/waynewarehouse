import axios from 'axios';

//actions
const GET_USER = 'GET_USER';

//action creators

const getUser = (user) => {
    return {
        type: GET_USER,
        user
    };
}

//thunks
export const fetchUser = (userId) => {
    return (dispatch) => {
        axios.get(`/api/users/${userId}`)
            .then(res => res.data)
            .then(user => {
                dispatch(getUser(user));
            }).catch(console.log)
    }
}


//reducer
export default function (state = {}, action) {
    switch (action.type) {
        case GET_USER:
            return Object.assign({}, state, { user: action.user });
        default:
            return state;
    }
}
