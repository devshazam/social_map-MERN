import {createStore, combineReducers} from "redux";
import {cashReducer} from "./cashReducer";
import {customerReducer} from "./customerReducer";

const rootReducer = combineReducers({
    cash: cashReducer,
    customer: customerReducer,
})

export const store = createStore(rootReducer)

