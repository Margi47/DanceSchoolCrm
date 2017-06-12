import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Group } from '../models/group';
import { GroupActions } from '../actions/group.actions';
import * as _ from 'lodash';

export type GroupListState = Group[];

const initialState: GroupListState = [];

export default function (state = initialState, action: Action): GroupListState {
    console.log(action);
    switch (action.type) {
        case GroupActions.LOAD_GROUPS_SUCCESS: {
            return action.payload;
        }
        case GroupActions.LOAD_AVAILABLE_USER_GROUPS_SUCCESS: {
            return action.payload;
        }
        case GroupActions.LOAD_AVAILABLE_TEACHER_GROUPS_SUCCESS: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}