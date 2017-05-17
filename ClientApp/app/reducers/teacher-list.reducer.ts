import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Teacher } from '../models/teacher';
import { TeacherActions } from '../actions/teacher.actions';
import * as _ from 'lodash';

export type TeacherListState = Teacher[];

const initialState: TeacherListState = [];

export default function (state = initialState, action: Action): TeacherListState {
    switch (action.type) {
        case TeacherActions.LOAD_ALL_TEACHERS_SUCCESS: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}