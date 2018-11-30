import actionTypes from '../actions/actionTypes'
import {updateCurrentGames, onError} from '../actions/'
import {take, call, put} from 'redux-saga/effects'
import logic from '../logic/'

export default function * getCurrentGames() {
  while (true) {
    const {payload:{nickname,token}}  = yield take(actionTypes.GET_CURRENT_GAMES)
    console.log('getCurrentGames Saga received action', nickname,token)
    try {
      const data = yield call(logic.getGamesForUser.bind(logic),nickname,token)
      yield put(updateCurrentGames(data))
    } catch (e) {
      yield put(onError(e))
    }
  }

}
