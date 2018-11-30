import {fork, all} from 'redux-saga/effects'
import updateCurrentGames from './updateCurrentGames'
import getCurrentGames from './getCurrentGames'
import acknowledgeGameOver from './acknowledgeGameOver'
import authenticate from './authenticate'
import gameMove from './gameMove'
import getUsersForString from './getUsersForString'
import requestGame from './requestGame'
import respondToGameRequest from './respondToGameRequest'
import logout from './logout'
import polling from './polling'

export default function* rootSaga() {
  console.log("Starting root saga")
  yield all(
    [
      fork(updateCurrentGames),
      fork(getCurrentGames),
      fork(gameMove),
      fork(acknowledgeGameOver),
      fork(authenticate),
      fork(getUsersForString),
      fork(requestGame),
      fork(respondToGameRequest),
      fork(logout),
      fork(polling),
    ]
  )
}