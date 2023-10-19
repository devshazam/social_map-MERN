interface customerState {
    users: any[];
}
interface actionState {
    type: string;
    payload:any[]
}

const defaultState: customerState = {
    users: []
}

const ADD_CUSTOMER = "ADD_CUSTOMER";
const REMOVE_CUSTOMER = "REMOVE_CUSTOMER";

export const customerReducer = (state: customerState = defaultState, action: actionState) =>{
    switch (action.type){
        case ADD_CUSTOMER:
            return {...state, users: [...state.users, action.payload]}
        case REMOVE_CUSTOMER:
            return {...state, users: state.users.filter(customer => customer.id !== action.payload)}
        default:
            return state

    }
}

// export const addCustomerAction = (payload) => ({type: ADD_CUSTOMER, payload})
// export const removeCustomerAction = (payload) => ({type: REMOVE_CUSTOMER, payload})