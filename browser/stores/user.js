import axios from 'axios';

//actions
const GET_USER = 'GET_USER';
const ADD_USER = 'ADD_USER';

//action creators

const getUser = (user) => {
    return {
        type: GET_USER,
        user
    };
}


const addUser = (user) => {
    return {
        type: ADD_USER,
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

export const postUser = (user, history) => {
    return (dispatch) => {
        axios.post('/api/users', user)
        .then(res => res.data)
        .then(user => {
            dispatch(addUser(user));
            history.push(`/users/${user.id}`);
        })
    }
}


//reducer
export default function (state = {}, action) {
    switch (action.type) {
        case GET_USER:
            return Object.assign({}, state, action.user);
        case ADD_USER:
            return Object.assign({},state, action.user);
        default:
            return state;
    }
}
