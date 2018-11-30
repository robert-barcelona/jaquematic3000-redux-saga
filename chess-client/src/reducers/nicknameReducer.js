import actionTypes from '../actions/actionTypes'


const nicknameReducer = (state = '', action) => {
  console.log('in nickname reducer, action =',action)
  switch (action.type) {
    case actionTypes.UPDATE_NICKNAME:
      const nickname = action.payload.nickname
      if (!nickname) return state
      return nickname
    case actionTypes.CLEAR_NICKNAME:
      return ''
    default:
      return state
  }
};

export default nicknameReducer;
