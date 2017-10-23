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
            }).catch(console.log)
    }
}

export const deleteUserOnServer = (userId) => {
  return (dispatch) => {
    axios.delete(`/api/users/${userId}`)
      .then(() => {
        dispatch(fetchUsers())
      })
      .catch(console.log)
  }
}

export const updateUserOnServer = (userId, userUpdate) => {
  return (dispatch) => {
    axios.put(`/api/users/${userId}`, userUpdate)
      .then(() => {
        dispatch(fetchUsers())
      })
      .catch(console.log)
  }
}

//reducer
export default function (state = [], action) {
    switch (action.type) {
        case GET_USERS:
            return Object.assign([], state, action.users);

        default:
            return state;
    }
}
