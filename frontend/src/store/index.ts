import {createStore, combineReducers} from "redux";
import {userReducer} from "./userReducer";
import {appReducer} from "./appReducer";

const rootReducer = combineReducers({
    user: userReducer,
    app: appReducer,
})

export const store = createStore(rootReducer)

