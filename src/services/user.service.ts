// API calls under users/
import axios from 'axios';
import {apiConstants} from "../constants/api.constant"

export const userService = {
    getUsers,
    postUser,
    getUserByUserId,
    putUserByUserId,
    deleteUserByUserId
};

function getUsers() { 
    // get all users
    return axios.get(apiConstants.BASE_URL + '/users')
        .then(
            res => {
                return res.data;
            },
            error => {
                console.log(error);
            }
        )
}

function postUser(firstName: string, lastName: string, email: string) { 
    // creaet new user
    return axios.post(apiConstants.BASE_URL + '/users', {
        firstName: firstName,
        lastName: lastName,
        email: email,
        projects: []
    }).then(res => {
        return res;
    })
}

function getUserByUserId(userId: number) { 
    // get user by id
    return axios.get(apiConstants.BASE_URL + '/users/' + userId).then(res=> {
        return res;
    })
}

function putUserByUserId(firstName: string, lastName: string, userId: number) { 
    // update user firstname and lastname
    return axios.put(apiConstants.BASE_URL + '/users/' + userId, {
        firstName: firstName,
        lastName: lastName
    }).then(res=> {
        return res;
    })
}

function deleteUserByUserId(userId: number) { 
    // delete user by id
    return axios.delete(apiConstants.BASE_URL + '/users/' + userId).then(res=> {
        return res;
    })
}
