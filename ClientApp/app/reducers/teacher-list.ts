import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Teacher } from '../models/teacher';
import { TeacherActions } from '../actions/teacher.actions';
import * as _ from 'lodash';

export type TeacherListState = Teacher[];

const initialState: TeacherListState = [];

export default function (state = initialState, action: Action): TeacherListState {
    console.log(action);
    switch (action.type) {
        case TeacherActions.LOAD_TEACHERS_SUCCESS: {
            return action.payload;
        }
        case TeacherActions.LOAD_ALL_GROUPS_SUCCESS: {
            for (var i = 0; i < action.payload.length; i++) {
                state[i].groups = action.payload[i];
            }
            return state;
        }
        case TeacherActions.ADD_TEACHER_SUCCESS: {
            return [...state, action.payload];
        }
        case TeacherActions.UPDATE_TEACHER_SUCCESS: {
            let index = _.findIndex(state, { id: action.payload.id });
            if (index >= 0) {
                return [
                    ...state.slice(0, index),
                    action.payload,
                    ...state.slice(index + 1)
                ];
            }
            return state;
        }
        case TeacherActions.DELETE_TEACHER_SUCCESS: {
            return state.filter(teacher => {
                return teacher.id !== action.payload.id;
            });
        }
        default: {
            return state;
        }
    }
}