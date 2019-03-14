import { userConstants } from "../constants/user.constant";

let user = localStorage.getItem("user");
const initState = user ? {loggingIn: true, user} : {};

export function authentication (state = initState, action: any) {
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
    }
}
