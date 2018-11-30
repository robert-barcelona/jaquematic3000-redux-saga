import actionTypes from '../actions/actionTypes'
import {take, call} from 'redux-saga/effects'

export default function * updateCurrentGames() {
  while (true) {
    console.log('updateCurrentGames Saga')
    const action = yield take(actionTypes.UPDATE_CURRENT_GAMES)
    console.log("UPDATE_CURRENT_GAMES action detected in saga UPDATE CURRENT GAMES with action", action)
  }

}