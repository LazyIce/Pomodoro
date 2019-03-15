import axios from 'axios';

export const authenticationService = {
    login,
    logout
};

function login(username: string, type: string) {
    if (type == "admin") {
        return axios.get('http://localhost:3003/admin').then(res=> {
            let user = res.data.name;
            if (username == res.data.name)
                localStorage.setItem('user', res.data.name);
            return user;
        })
    } else {
        return axios.get('http://localhost:3003/users').then(res => {
            let users = res.data;
            let curUser = users.filter(user => user.email == username);
            let fullname = curUser[0].firstName + " " + curUser[0].lastName
            localStorage.setItem('user', fullname);
            return fullname
        }) 
    }
}

function logout() {
    localStorage.removeItem('user');
}