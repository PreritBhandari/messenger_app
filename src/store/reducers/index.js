import { combineReducers } from "redux";
import mainReducer from "./mainReducer";

const rootReducer = combineReducers({
    messagesData: mainReducer,
});

export default rootReducer;