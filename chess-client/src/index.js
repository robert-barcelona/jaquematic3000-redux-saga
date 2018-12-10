import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {HashRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux'
import {composeWithDevTools} from 'redux-devtools-extension';

import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import rootSaga from './sagas'


const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware( sagaMiddleware)
  ))

//console.log("Index.js store =", store)
sagaMiddleware.run(rootSaga)

ReactDOM.render(<HashRouter><Provider store={store}><App/></Provider></HashRouter>, document.getElementById('root'));
registerServiceWorker();
