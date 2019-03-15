import { authenticationConstants } from "../constants/authentication.constant"
import { history } from "../helpers/history";
import { authenticationService } from "../services/authentication.service";

export const userActions = {
    login,
    logout
};

function login(username: string, type: string) {
    return dispatch => {
        authenticationService.login(username, type)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/dashboard');
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
    history.push('/login');
    return { type: authenticationConstants.LOGOUT };
}