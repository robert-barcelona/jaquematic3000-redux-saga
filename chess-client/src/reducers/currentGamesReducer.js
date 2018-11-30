import actionTypes from '../actions/actionTypes'

 const currentGamesReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.UPDATE_CURRENT_GAMES:
      const {payload:{games}} = action
      if (!games) return state
      return games
    case actionTypes.CLEAR_CURRENT_GAMES:
      return []
    default:
      return state
  }
};

export default currentGamesReducer;
