import {combineReducers} from "redux";
import favoritesReducer from "./reducers/favoritesReducer";

const rootReducer = combineReducers({
    favorite : favoritesReducer
})

export default rootReducer;