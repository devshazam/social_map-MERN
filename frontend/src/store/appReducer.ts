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
    filter: any,
}
const defaultState:def = {
    img: null,
    map: {},
    common: {}, 
    main: {},
    unique: {},
    filter: {}
}

export const appReducer = (state = defaultState, action: actionState) =>{
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
        case "FILTER":
            return {...state, filter: {...state.filter, ...action.payload}}
        default:
            return state

    }
}




// interface customerState {
//     users: any[];
// }
// interface actionState {
//     type: string;
//     payload:any[]
// }
//
// const defaultState: customerState = {
//     users: []
// }
//
// // const ADD_CUSTOMER = "ADD_CUSTOMER";
// // const REMOVE_CUSTOMER = "REMOVE_CUSTOMER";
//
// export const appReducer = (state: customerState = defaultState, action: actionState) =>{
//     switch (action.type){
//         case ADD_CUSTOMER:
//             return {...state, users: [...state.users, action.payload]}
//         case REMOVE_CUSTOMER:
//             return {...state, users: state.users.filter(customer => customer.id !== action.payload)}
//         default:
//             return state
//
//     }
// }

// export const addCustomerAction = (payload) => ({type: ADD_CUSTOMER, payload})
// export const removeCustomerAction = (payload) => ({type: REMOVE_CUSTOMER, payload})