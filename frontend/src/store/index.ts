import {createStore, combineReducers} from "redux";
import {userReducer} from "./userReducer";
import {createReducer} from "./createReducer";

const rootReducer = combineReducers({
    user: userReducer,
    create: createReducer,
})

export const store = createStore(rootReducer)

