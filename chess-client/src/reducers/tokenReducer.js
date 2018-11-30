import actionTypes from '../actions/actionTypes'

const tokenReducer = (state = '', action) => {
  console.log('in token reducer, action =',action)
  switch (action.type) {
    case actionTypes.UPDATE_TOKEN:
      const token = action.payload.token
      if (!token) return state
      return token
    case actionTypes.CLEAR_TOKEN:
      return ''
    default:
      return state
  }
};

export default tokenReducer;
