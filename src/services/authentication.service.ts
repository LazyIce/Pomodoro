import axios from 'axios';

export const authenticationService = {
    login,
    logout
};

function login(username: string) {
    return axios.get('http://localhost:3003/users').then(res => {
        let user = res.data;
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    }) 
}

function logout() {
    localStorage.removeItem('user');
}