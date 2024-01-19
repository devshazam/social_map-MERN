interface actionState {
    type: string;
    payload: number
}

const defaultState = {
    alert: {
        modal: false,
        variant: 'success',
        text: 'Информационное сообщение!'
    }
}

export const appReducer = (state = defaultState, action: actionState) =>{
    switch (action.type){
        case "ALERT":
            return {...state, alert: action.payload}
        case "CHANGE":
            return {...state, alert: {...state.alert, modal: action.payload}}
        default:
            return state

    }
}

