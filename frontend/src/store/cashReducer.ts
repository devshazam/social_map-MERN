const defaultState = {
    cash: 3,
}
interface actionState {
    type: string;
    payload: number
}


export const cashReducer = (state = defaultState, action: actionState) =>{
    switch (action.type){
        case "ADD_CASH":
            return {...state, cash: state.cash + action.payload}
        case "GET_CASH":
            return {...state, cash: state.cash - action.payload}
        default:
            return state

    }
}

