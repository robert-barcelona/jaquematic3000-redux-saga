import logic from "../logic"
import actionTypes from '../actions/actionTypes'
import {getCurrentGames, onError} from '../actions/'
import {take, call, put} from 'redux-saga/effects'

export default function* respondToGameRequest() {
  while (true) {
    const {payload: {nickname, destination, gameID, answer, token}} = yield take(actionTypes.RESPOND_TO_GAME_REQUEST)
   // console.log('respondToGameRequest Saga received action', nickname, destination, gameID, answer, token)
    try {
      yield call(logic.respondToGameRequest.bind(logic), nickname, destination, gameID, answer, token)
      yield put(getCurrentGames(nickname, token))
    } catch (e) {
      yield put(onError(e))
    }
  }
}


