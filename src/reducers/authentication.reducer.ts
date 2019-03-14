import { userConstants } from "../constants/user.constant";

let user = JSON.stringify(localStorage.getItem("user") || '{}');
const initState = user ? {loggingIn: true, user} : {};

export function authentication (state = initState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {};
        case userConstants.LOGOUT:
            return {};
        default:
            return state;
    }
}
