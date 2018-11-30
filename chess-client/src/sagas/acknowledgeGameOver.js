import actionTypes from '../actions/actionTypes'
import {getCurrentGames, onError} from '../actions/'
import {take, call, put} from 'redux-saga/effects'
import logic from '../logic/'

export default function* acknowledgeGameOver() {
  while (true) {
    const {payload: {nickname, gameID, token}} = yield take(actionTypes.ACKNOWLEDGE_GAME_OVER)
    console.log('acknowledgeGameOver Saga received action', nickname, gameID, token)
    try {
      yield call(logic.onAcknowledgeGameOver().bind(logic), nickname, gameID, token)
      yield put(getCurrentGames())
    } catch (e) {
      yield put(onError(e))
    }
  }

}