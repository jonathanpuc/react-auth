
import { UNAUTH_USER, SIGN_IN_REQUEST, SIGN_UP_REQUEST } from './types';


export function signinUser({ email, password }) {
    return {
        type: SIGN_IN_REQUEST,
        payload: { email, password }
    }
}

export function signoutUser() {
    localStorage.removeItem('token');
    return {
        type: UNAUTH_USER
    }
}

export function signupUser({ email, password, passwordConfirm }) {
    return {
        type: SIGN_UP_REQUEST,
        payload: { email, password, passwordConfirm }
    }
}