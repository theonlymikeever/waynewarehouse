import axios from 'axios';
import history from '../history';

//actions
const SET_CURRENT_USER = 'SET_CURRENT_USER';
const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';
const UPDATE_USER = 'UPDATE_USER';

//action creators

const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        user
    };
};

const removeCurrentUser = () => {
    return {
        type: REMOVE_CURRENT_USER,
    };
};


//thunks
export const fetchUser = () => {
    return (dispatch) => {
        axios.get(`/login`)
            .then(res => res.data)
            .then(user => {
                dispatch(setCurrentUser(user));
            }).catch(console.log)
    }
}

export const postUser = (user, history) => {
    return (dispatch) => {
        axios.post('/api/users/signup', user)
            .then(res => res.data)
            .then(user => {
                if (user.err) {
                    return dispatch(setCurrentUser(user.err));
                }
                dispatch(setCurrentUser(user));
                history.push(`/users/${user.id}`);
            }).catch(console.log)
    }
}

export const updateUser = (user) => {
    console.log('update', user);
    return (dispatch) => {
        axios.put(`/api/users/${user.id}`, user)
            .then(res => res.data)
            .then(user => {
                dispatch(fetchUser(user));
            })
    }
}

export const loginActionCreator = (credentials, history) => {
    return (dispatch) => {
        axios.post('/login', credentials)
            .then(results => {
                return results.data;
            })
            .then(user => {
                if (user.err) {
                    console.log('error', user);
                    dispatch(setCurrentUser(user));
                    return;
                }

                dispatch(fetchUser(user));
                history.push('/');
            });
    };
};

export const googleLoginActionCreator = (credentials, history) => {
    return (dispatch) => {
        console.log('googleLoginActionCreator thunk')
        axios.post('/login/google', credentials)
            .then(results => results.data)
            .then(user => {
                dispatch(setCurrentUser(user));
                history.push('/');
            })
    };
};

export const logoutActionCreator = (history) => {
    return (dispatch => {
        axios.delete('/login')
            .then(() => {
                dispatch(removeCurrentUser());
                var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut()
                    .then(function () {
                        console.log('User signed out.');
                    });
                history.push('/');
            });
    });
};

//reducer
export default function (state = {}, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return Object.assign({}, state, action.user);
        case REMOVE_CURRENT_USER:
            return Object.assign({});
        default:
            return state;
    }
}
