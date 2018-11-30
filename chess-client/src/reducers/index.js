import { combineReducers } from "redux";
import currentGamesReducer from "./currentGamesReducer";
import nicknameReducer from "./nicknameReducer";
import tokenReducer from "./tokenReducer";
import usersReducer from "./usersReducer";
import errorReducer from "./errorReducer";

export default combineReducers({ currentGames: currentGamesReducer,error:errorReducer,nickname:nicknameReducer,token:tokenReducer,users:usersReducer });
