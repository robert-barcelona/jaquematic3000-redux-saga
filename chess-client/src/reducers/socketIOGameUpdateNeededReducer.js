import actionTypes from '../actions/actionTypes'

const socketIOGameUpdateNeeded = (state = false, action) => {
  switch (action.type) {
   case actionTypes.SOCKET_IO_GAMES_DIRTY:
      const {payload:{bool}} = action
      return bool
    default:
      return state
  }
};

export default socketIOGameUpdateNeeded;



