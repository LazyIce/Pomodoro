import axios from 'axios';

export const userService = {
    login,
    logout
};

function login(username: string, password: string) {
    return axios.get('http://localhost:3003/users').then(res => {
        let user = res.data;
        localStorage.setItem('user', JSON.stringify(user));
        return user;
    }) 
}

function logout() {
    localStorage.removeItem('user');
}