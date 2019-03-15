import axios from 'axios';
import {apiConstants} from "./../constants/api.constant";

export const authenticationService = {
    login,
    logout
};

function login(username: string, type: string) {
    if (type == "admin") {
        return axios.get(apiConstants.BASE_URL + '/admin?q=' + username)
            .then(
                res => {
                    if (res.data.length == 0) {
                        let msg = "Admin name is incorrect!";
                        return msg;
                    } else {
                        let user = res.data[0];
                        localStorage.setItem("user", user.name);
                        return user;
                    }
                }
            )
    } else {
        return axios.get(apiConstants.BASE_URL + '/users?q=' + username)
            .then(
                res => {
                    if (res.data.length == 0) {
                        let msg = "User email is incorrect!";
                        return msg;
                    } else {
                        let user = res.data[0];
                        localStorage.setItem("user", user.email);
                        return user;
                    }
                }
            )
    }
}

function logout() {
    localStorage.removeItem('user');
}