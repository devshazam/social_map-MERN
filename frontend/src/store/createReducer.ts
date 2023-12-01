interface actionState {
    type: string;
    payload: any
}
interface def {
    img: any,
    map: any,
    common: any,
    main: any,
    unique: any,
}
const defaultState:def = {
    img: {img: null, dimensions: null},
    map: {address: '', latitude: '', longitude: ''},
    common: {name: '', description: '', district: ''}, 
    main: {cost: '0'},
    unique: {uniquePart: {0: ['Дополнительные параметры:', 'НЕТ']}},
}

export const createReducer = (state = defaultState, action: actionState) =>{
    switch (action.type){
        case "IMG":
            return {...state, img: action.payload}
        case "MAP":
            return {...state, map: action.payload}
        case "COMMON":
            return {...state, common: action.payload}
        case "MAIN":
            return {...state, main: action.payload}
        case "UNIQUE":
            return {...state, unique: action.payload}
        default:
            return state

    }
}



