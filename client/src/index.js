import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import createSagaMiddleware from 'redux-saga'

import { watcherSaga } from "./sagas/sagas";

import App from './components/app';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import reducers from './reducers';

const sagaMiddleware = createSagaMiddleware()

const reduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();


let store = createStore(
  reducers,
  compose(applyMiddleware(sagaMiddleware), reduxDevTools)
);




ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} >
        <Route path="/signin" component={Signin} />
        <Route path="/signout" component={Signout} />
        <Route path="/signup" component={Signup} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));

sagaMiddleware.run(watcherSaga);