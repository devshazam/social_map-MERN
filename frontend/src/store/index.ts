import {createStore, combineReducers} from "redux";
import {userReducer} from "./userReducer";
import {customerReducer} from "./customerReducer";

const rootReducer = combineReducers({
    user: userReducer,
    customer: customerReducer,
})

export const store = createStore(rootReducer)

