interface actionState {
    type: string;
    payload: number
}

const defaultState = {
    isAuth: false,
    user: {}
}

export const userReducer = (state = defaultState, action: actionState) =>{
    switch (action.type){
        case "AUTH":
            return {...state, isAuth: action.payload}
        case "USER":
            return {...state, user: action.payload}
        default:
            return state

    }
}

