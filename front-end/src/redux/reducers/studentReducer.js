import { ActionTypes } from "../constants/action-types"

const initialState = {
    students: []
}

export const studentReducer = (state = initialState, {type, payload}) => { 
    switch(type) {
        case ActionTypes.SET_STUDENTS:
            return {...state, students: payload };
        default:
            return state;
    }
}