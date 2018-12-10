import logic from "../logic"
import actionTypes from '../actions/actionTypes'
import {onError} from '../actions/'
import {take, call, put} from 'redux-saga/effects'

export default function * requestGame() {
  while (true) {
    const {payload:{nickname,destination, token}}  = yield take(actionTypes.REQUEST_GAME)
  //  console.log('requestGame Saga received action', nickname,destination,token)
    try {
      yield call(logic.requestGame.bind(logic),nickname,destination,token)
    } catch (e) {
      yield put(onError(e))
    }
  }
}

