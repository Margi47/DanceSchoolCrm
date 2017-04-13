import { Action } from '@ngrx/store';

import { Group } from '../models/group';
import { GroupActions } from '../actions/group.actions';

export type GroupState = Group;

const initialState: GroupState = {
    id: 0,
    name: '',
    description: '',
    isActive: false,
    students: []
};

export default function (state = initialState, action: Action): GroupState {
    switch (action.type) {
        case GroupActions.GET_GROUP_SUCCESS: {
            return action.payload;
        }
        case GroupActions.LOAD_STUDENTS_SUCCESS: {
            state.students = action.payload;
            return state;
        }
        case GroupActions.ADD_STUDENT_SUCCESS: {
            state.students = [...state.students, action.payload];
            return state;
        }
        default: {
            return state;
        }
    }
}