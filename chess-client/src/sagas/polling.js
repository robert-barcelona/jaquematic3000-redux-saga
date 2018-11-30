/**
 * modified from https://github.com/Chiara-yen/redux-saga-timer-example/blob/master/app/sagas/index.js
 */

import { call, put, take, fork, cancel,select } from 'redux-saga/effects'
import { getCurrentGames } from '../actions/'
import actionTypes from '../actions/actionTypes'
import {nickname,token} from '../selectors/'
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
const POLL_TIME = 2000

function* tick(nickname,token) {
  while(true) {
    console.log(`polling for ${nickname}`)
    yield call(delay, POLL_TIME);
    yield put(getCurrentGames(nickname,token));
  }
}

function* polling() {
  while(true) {
   yield take(actionTypes.START_POLLING)
    const name = yield select(nickname)
    const tken = yield select(token)
    // starts the task in the background
    const bgSyncTask = yield fork(tick,name,tken)

    // wait for the user stop action
    yield take(actionTypes.STOP_POLLING)
    // user clicked stop. cancel the background task
    // this will throw a SagaCancellationException into task
    yield cancel(bgSyncTask)
  }
}

export default polling