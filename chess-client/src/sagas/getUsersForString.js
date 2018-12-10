import logic from "../logic"
import actionTypes from '../actions/actionTypes'
import {updateUsers,onError} from '../actions/'
import {take, call, put} from 'redux-saga/effects'

export default function * getUsersForString() {
  while (true) {
    const {payload:{nickname,searchString, token}}  = yield take(actionTypes.GET_USERS)
    //console.log('getUsersForString Saga received action', nickname,searchString,token)
    try {
      const users = yield call(logic.getUsersForString.bind(logic),nickname,searchString,token)
      yield put(updateUsers(users))
    } catch (e) {
      yield put(onError(e))
    }
  }
}
