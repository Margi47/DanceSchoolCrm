import { ActionWithPayload } from '../actions/actionWithPayload';
import { TeacherList } from '../actions/actionWithPayload';
import { Observable } from 'rxjs/Observable';

import { Teacher } from '../models/teacher';
import { TeacherActions } from '../actions/teacher.actions';
import * as _ from 'lodash';

export type TeacherListState = { teachers: Teacher[], total: number, filter: string };

const initialState: TeacherListState = { teachers: [], total: 0, filter: "" };

export default function (state = initialState, action: ActionWithPayload<TeacherList>): TeacherListState {
    switch (action.type) {
        case TeacherActions.LOAD_ALL_TEACHERS_SUCCESS: {
            return Object.assign({}, state, {
                teachers: action.payload.teacherList,
                total: action.payload.total,
                filter: action.payload.filter
            });
        }
        case TeacherActions.LOAD_AVAILABLE_TEACHERS_SUCCESS: {
            if (action.payload.filter == state.filter) {
                return Object.assign({}, state, {
                    teachers: [...state.teachers, ...action.payload.teacherList],
                    total: action.payload.total,
                    filter: action.payload.filter
                });
            }
            else {
                return Object.assign({}, state, {
                    teachers: action.payload.teacherList,
                    total: action.payload.total,
                    filter: action.payload.filter
                });
            }
        }
        default: {
            return state;
        }
    }
}
