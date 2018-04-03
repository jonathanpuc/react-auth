import { takeLatest, call, put, all } from 'redux-saga/effects';
import axios from 'axios';
import { browserHistory } from 'react-router';

import { SIGN_IN_REQUEST, AUTH_USER, AUTH_ERROR, SIGN_UP_REQUEST } from '../actions/types';


export function* watcherSaga() {
    yield all([takeLatest(SIGN_IN_REQUEST, handleSignInRequest),
    takeLatest(SIGN_UP_REQUEST, handleSignUpRequest)])
}

function signin({ email, password }) {
    return axios.post('http://localhost:3090/signin', { email, password })
}

function signup({ email, password }) {
    return axios.post('http://localhost:3090/signup', { email, password })
}

function* handleSignInRequest(action) {
    try {
        const response = yield call(signin, action.payload);
        const signinResult = response;
        localStorage.setItem('token', response.data.token)
        browserHistory.push('/feature');
        yield put({ type: AUTH_USER })
    } catch (e) {
        yield put({ type: AUTH_ERROR, error: `${e.response.statusText}: incorrect credentials` })
    }
}

function* handleSignUpRequest(action) {
    try {
        let { email, password, passwordConfirm } = action.payload;
        if (password !== passwordConfirm) {
            yield put({ type: AUTH_ERROR, error: "Password's dont match. Please try again." });
            return;
        }
        const response = yield call(signup, { email, password });
        const signupResult = response;
        localStorage.setItem('token', response.data.token)
        browserHistory.push('/feature');
        yield put({ type: AUTH_USER })
    } catch (e) {
        console.log(e.response.data.error)
        yield put({ type: AUTH_ERROR, error: `Ooopsie! ${e.response.data.error}` });
    }
}