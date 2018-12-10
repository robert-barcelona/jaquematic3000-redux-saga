import actionTypes from '../actions/actionTypes'



const userReducer = (state = [], action) => {
  //console.log('in users reducer, action =',action)
  switch (action.type) {
    case actionTypes.UPDATE_USERS:
      const users = action.payload.users
      if (!users) return state
      return [...users]
    case actionTypes.CLEAR_USERS:
      return []
    default:
      return state
  }
};

export default userReducer;
