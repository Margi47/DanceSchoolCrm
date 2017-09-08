import { ActionWithPayload } from '../actions/actionWithPayload';
import { TeacherList } from '../actions/actionWithPayload';
import { Observable } from 'rxjs/Observable';

import { Teacher } from '../models/teacher';
import { TeacherActions } from '../actions/teacher.actions';
import * as _ from 'lodash';

export type TeacherListState = { teachers: Teacher[], total: number };

const initialState: TeacherListState = { teachers: [], total: 0 };

export default function (state = initialState, action: ActionWithPayload<TeacherList>): TeacherListState {
    switch (action.type) {
        case TeacherActions.LOAD_ALL_TEACHERS_SUCCESS: {
            return Object.assign({}, state, { teachers: action.payload.teacherList, total: action.payload.total });
        }
        case TeacherActions.LOAD_AVAILABLE_TEACHERS_SUCCESS: {
            return Object.assign({}, state, {
                teachers: [...state.teachers, ...action.payload.teacherList],
                total: action.payload.total
            });
        }
        default: {
            return state;
        }
    }
}
