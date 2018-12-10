import actionTypes from '../actions/actionTypes'


const errorReducer = (state = '', action) => {
 // console.log('in onError reducer, action =',action)
  switch (action.type) {
    case actionTypes.UPDATE_ERROR:
      const {payload:{error:{message}}} = action
      //console.log('in onError reducer,UPDATE_ERROR, action =',message)

      if (!message) return state
      return message
    case actionTypes.CLEAR_ERROR:
      return ''
    default:
      return state
  }
}

export default errorReducer;
