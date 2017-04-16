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

export default function (state = initialState, action: Action): Teacher {
    switch (action.type) {
        case TeacherActions.GET_TEACHER_SUCCESS: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}