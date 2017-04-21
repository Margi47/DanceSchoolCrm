import { Action } from '@ngrx/store';

import { Teacher } from '../models/teacher';
import { TeacherActions } from '../actions/teacher.actions';

import { User } from '../models/user';

export type TeacherState = Teacher;

const initialState: TeacherState = {
    id: 0,
    name: '',
    groups: [],
    styles: []
};

export default function (state = initialState, action: Action): TeacherState {
    switch (action.type) {
        case TeacherActions.GET_TEACHER_SUCCESS: {
            return action.payload;
        }
        case TeacherActions.GET_TEACHER_GROUPS_SUCCESS: {
            return Object.assign({}, state, { groups: action.payload });
        }
        case TeacherActions.ADD_TEACHER_GROUPS_SUCCESS: {
            return Object.assign({}, state, { groups: [...state.groups, ...action.payload] });
        }
        case TeacherActions.REMOVE_TEACHER_GROUPS_SUCCESS: {
            return Object.assign({}, state,
                { groups: state.groups.filter(g => g.id !== action.payload) });
        }
        default: {
            return state;
        }
    }
}