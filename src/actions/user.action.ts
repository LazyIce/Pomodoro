import { userConstants } from "./../constants/user.constants";
import { userService } from "./../services/user.service";
import { request } from "https";

export const userActions = {
    getAllUsers,
    addUser,
    updateUser,
    deleteUser
}

function getAllUsers() {
    return dispatch => {
        userService.getUsers()
            .then(
                users => {
                    dispatch(success(users));
                }
            )
    };

    function success(users) { return { type: userConstants.GET_ALL_USERS_SUCCESS, users} }

}

function addUser(user) {
    return dispatch =>  {
        userService.postUser(user.firstName, user.lastName, user.email)
            .then(
                user => dispatch(success(user.data))
            );
    };

    function success(user) { return { type: userConstants.USER_CREATE_SUCCESS, user} }
}

function updateUser(user) {
    return dispatch =>  {
        userService.putUserByUserId(user.fisrtName, user.lastName, user.id)
            .then(
                user => dispatch(success(user))
            );
    };

    function success(user) { return { type: userConstants.USER_UPDATE_SUCCESS, user} }
}

function deleteUser(userId: number) {
    return dispatch =>  {
        userService.deleteUserByUserId(userId)
            .then(
                user => {
                    dispatch(success(user.data))
                }
            );
    };

    function success(user) { return { type: userConstants.USER_DELETE_SUCCESS, user} }
}