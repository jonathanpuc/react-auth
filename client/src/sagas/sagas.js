import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { browserHistory } from 'react-router';

import { AUTH_USER, AUTH_ERROR } from '../actions/types';


export function* watcherSaga() {
    yield takeLatest("SIGN_IN_REQUEST", workerSaga);
}

function signin({ email, password }) {
    return axios.post('http://localhost:3090/signin', { email, password })
}

function* workerSaga(action) {
    try {
        const response = yield call(signin, action.payload);
        const signinResult = response;
        localStorage.setItem('token', response.data.token)
        browserHistory.push('/feature');
        yield put({ type: AUTH_USER })
    } catch (e) {
        yield put({ type: AUTH_ERROR, error: `${e.response.statusText}: incorrect credentials` })
    }
    // Submit email/password to the server

    // if request is good...

    // - Update state ot indicate user is authenticated
    // - Save the JWT token
    // - Redirect to the route /feature

    // If request is bad...
    // - Show an error the user
}