import { Action } from '@ngrx/store';

import { Group } from '../models/group';
import { GroupActions } from '../actions/group.actions';

export type GroupState = Group;

const initialState: GroupState = {
    id: 0,
    name: '',
    description: '',
    isActive: false,
    students: [],
    teachers: []
};

export default function (state = initialState, action: Action): GroupState {
    switch (action.type) {
        case GroupActions.GET_GROUP_SUCCESS: {
            return action.payload;
        }
        case GroupActions.LOAD_STUDENTS_SUCCESS: {
            return Object.assign({}, state, { students: action.payload });
        }
        case GroupActions.LOAD_TEACHERS_SUCCESS: {
            return Object.assign({}, state, { teachers: action.payload });
        }
        default: {
            return state;
        }
    }
}