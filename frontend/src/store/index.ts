import {createStore, combineReducers} from "redux";
import {userReducer} from "./userReducer";
import {appReducer} from "./appReducer";
import {createReducer} from "./createReducer";

const rootReducer = combineReducers({
    user: userReducer,
    app: appReducer,
    create: createReducer,
})

export const store = createStore(rootReducer)

