import {combineReducers} from 'redux';
import { studentReducer } from './studentReducer';

const reducers = combineReducers({
    allStudents : studentReducer
});

export default reducers;