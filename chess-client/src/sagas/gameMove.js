import actionTypes from '../actions/actionTypes'
import {onError,getCurrentGames} from '../actions/'
import {take, call, put} from 'redux-saga/effects'
import logic from '../logic/'

export default function * gameMove() {

  while (true) {
    const {payload:{nickname,move,gameID,token}}  = yield take(actionTypes.GAME_MOVE)
    console.log('gameMove Saga received action', nickname,move,gameID,token)
    try {
      yield call(logic.makeAGameMove.bind(logic),nickname,move,gameID, token)
      yield put(getCurrentGames(nickname,token))
    } catch (e) {
      yield put(onError(e))
    }
  }

}

