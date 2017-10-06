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

export default function (state = {}, action) {
    switch (action.type){
        case GET_USERS:

    }
}
