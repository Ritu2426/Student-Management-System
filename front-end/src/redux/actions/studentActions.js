import { ActionTypes } from "../constants/action-types"

export const setStudents = (students) => {
    return {
        type: ActionTypes.SET_STUDENTS,
        payload: students
    };
};