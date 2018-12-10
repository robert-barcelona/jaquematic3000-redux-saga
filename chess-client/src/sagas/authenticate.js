import actionTypes from '../actions/actionTypes'
import {updateNickname,updateToken,onError,getCurrentGames,startPolling} from '../actions/'
import {take, call, put} from 'redux-saga/effects'
import logic from '../logic/'

export default function * authenticate() {

  while (true) {
    const {payload:{nickname,password}}  = yield take(actionTypes.AUTHENTICATE)
    //console.log('authenticate Saga received action', nickname,password)
    try {
      const token = yield call(logic.authenticate.bind(logic),nickname,password)
      yield put(getCurrentGames(nickname,token))
      yield put(updateNickname(nickname))
      yield put(updateToken(token))
      yield put(startPolling())
    } catch (e) {
     // console.log('authenticate Saga error', e)
      const error = e

      debugger
      yield put(onError(e))
    }
  }

}

