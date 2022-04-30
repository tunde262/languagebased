import axios from 'axios';

import { 
    REGISTER_SUCCESS, 
    REGISTER_FAIL, 
    USER_LOADED, 
    AUTH_ERROR, 
    LOGIN_SUCCESS, 
    LOGIN_FAIL, 
    LOGOUT,
    CLEAR_USER
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async dispatch => {
    if(localStorage.token) {
        console.log('LOCAL STORAGE TOKEN');
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');

        console.log('LOAD USER');
        console.log(res.data)

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

// Register User
export const register = (username, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    console.log('START REGISTER');
    console.log(username); 

    const body = JSON.stringify({ 
        username,
        password
     });

    try {
        const res = await axios.post('/api/auth/register', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser(true, false));
        
        // window.location.href = "/home";
        // history.push(`home`);
    } catch (err) {
        console.log('ERRORS')
        console.log(err);
        
        // if(err.response) {
        //     const errors = err.response.data.errors;

        //     if(errors) {
        //         errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        //     }
        // }

        dispatch({
            type: REGISTER_FAIL
        });
    }
}

// Login User
export const login = (username, password ) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ 
        username,
        password
     });

    try {
        const res = await axios.post('/api/auth/login', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser(false, true));
    } catch (err) {
        console.log('ERRORS')
        console.log(err);
        
        // const errors = err.response.data.errors;

        // if(errors) {
        //     errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        // }

        dispatch({
            type: LOGIN_FAIL
        });
    }
}

// Logout
export const logout = () => dispatch => {
    dispatch({type: LOGOUT})
}

// Remove all posts
export const clearUser = () => dispatch => {
    dispatch({
        type: CLEAR_USER
    });

}

