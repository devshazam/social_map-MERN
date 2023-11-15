interface actionState {
    type: string;
    payload: number
}

const defaultState = {
    isAuth: false,
    user: null,
    modalLogin: false,
    modalReg: false
}

export const userReducer = (state = defaultState, action: actionState) =>{
    switch (action.type){
        case "AUTH":
            return {...state, isAuth: action.payload}
        case "USER":
            return {...state, user: action.payload}
        case "LOGIN":
            return {...state, modalLogin: action.payload}
        case "REG":
            return {...state, modalReg: action.payload}
        default:
            return state

    }
}

