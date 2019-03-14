import { authenticationConstants } from "../constants/authentication.constant"
import { history } from "../helpers/history";
import { authenticationService } from "../services/authentication.service";

export const userActions = {
    login,
    logout
};

function login(username: string) {
    return dispatch => {
        authenticationService.login(username)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function success(user: any) { return { type: authenticationConstants.LOGIN_SUCCESS, user } }
    function failure(error: any) { return { type: authenticationConstants.LOGIN_FAILURE, error } }
}

function logout() {
    authenticationService.logout();
    return { type: authenticationConstants.LOGOUT };
}