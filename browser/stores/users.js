import axios from 'axios';

//actions
const GET_USERS = 'GET_USERS';

//action creators

const getUsers = (users) => {
    return {
        type: GET_USERS,
        users
    };
}

//thunks

export const fetchUsers = () => {
    return (dispatch) => {
        axios.get('/api/users')
        .then(res => res.data)
        .then(users => {
            dispatch(getUsers(users));
        })
    }
}

//reducer
export default function (state = [], action) {
    console.log(action);
    switch (action.type) {
        case GET_USERS:
            return Object.assign({}, state, action.users);
        default:
            return state;
    }
}
