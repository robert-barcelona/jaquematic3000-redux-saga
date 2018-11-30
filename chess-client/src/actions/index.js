import actionTypes from './actionTypes'
import logic from "../logic"

export const updateCurrentGames = (games) => ({
  type: actionTypes.UPDATE_CURRENT_GAMES,
  payload: {games},
})

export const getCurrentGames = (nickname, token) => ({
  type: actionTypes.GET_CURRENT_GAMES,
  payload: {
    nickname,
    token,
  }
})

export const clearCurrentGames = () => ({
  type: actionTypes.CLEAR_CURRENT_GAMES,
})

export const clearUsers = () => ({
  type: actionTypes.CLEAR_USERS,
})

export const clearNickname = () => ({
  type: actionTypes.CLEAR_NICKNAME,
})

export const clearToken = () => ({
  type: actionTypes.CLEAR_TOKEN,
})


export const register = () => ({
  type: actionTypes.CLEAR_CURRENT_GAMES,

})

export const onError = (error) => ({
  type: actionTypes.UPDATE_ERROR,
  payload: {
    error,
  },
})

export const clearError = () => ({
  type: actionTypes.CLEAR_ERROR,
})
/*
export const socketIOGamesDirty = (bool) => ({
  type: actionTypes.SOCKET_IO_GAMES_DIRTY,
  payload: {
    bool,
  }
})*/

export const acknowledgeGameOver = (nickname, gameID, token) => ({
  type: actionTypes.ACKNOWLEDGE_GAME_OVER,
  payload: {
    nickname,
    gameID,
    token,
  }
})

export const authenticate = (nickname, password) => ({
  type: actionTypes.AUTHENTICATE,
  payload: {
    nickname,
    password,
  }
})


export const updateNickname = (nickname) => ({
  type: actionTypes.UPDATE_NICKNAME,
  payload: {
    nickname,
  }
})

export const updateToken = (token) => ({
  type: actionTypes.UPDATE_TOKEN,
  payload: {
    token,
  }
})


export const getUsersForString = (nickname, searchString, token) => ({
  type: actionTypes.GET_USERS,
  payload: {
    nickname,
    searchString,
    token,
  }
})

export const updateUsers = (users) => ({
  type: actionTypes.UPDATE_USERS,
  payload: {
    users,
  }
})

export const respondToGameRequest = (nickname, destination, gameID, answer, token) => ({
  type: actionTypes.RESPOND_TO_GAME_REQUEST,
  payload: {
    nickname,
    destination,
    gameID,
    answer,
    token,
  }
})


export const requestGame = (nickname, destination, token) => ({
  type: actionTypes.REQUEST_GAME,
  payload: {
    nickname,
    destination,
    token,
  }
})

export const gameMove = (nickname, move, gameID, token) => ({
  type: actionTypes.GAME_MOVE,
  payload: {
    nickname,
    move,
    gameID,
    token,
  }
})

export const startPolling = (nickname, token) => ({
  type: actionTypes.START_POLLING,

})

export const stopPolling = () => ({
  type: actionTypes.STOP_POLLING,
})


export const logout = () => ({
  type: actionTypes.LOGOUT,
})


