// import config from '../config';
// import { authHeader } from '../helpers';
import axios from 'axios'

export const userService = {
    login,
    logout,
}

function login(username, password) {
    const requestOptions = {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    }
    return axios.post('http://localhost:3000/user/login', requestOptions)
        .then(user => {
            if(user.data.access_token) {
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        })
}

function logout() {
    localStorage.removeItem('user');
}