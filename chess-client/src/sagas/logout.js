import logic from "../logic"
import actionTypes from '../actions/actionTypes'
import {take, call, put} from 'redux-saga/effects'
import {onError, clearCurrentGames,clearNickname,clearToken,clearUsers, stopPolling} from "../actions"

export default function* logout() {
  while (true) {
    yield take(actionTypes.LOGOUT)
    console.log('logout Saga received action')
    try {
      yield  put(clearCurrentGames())
      yield  put(clearNickname())
      yield  put(clearToken())
      yield  put(clearUsers())
      yield put(stopPolling())
    } catch (e) {
      yield put(onError(e))
    }
  }
}

