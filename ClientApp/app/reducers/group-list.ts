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
        case GroupActions.ADD_GROUP_SUCCESS: {
            return [...state, action.payload];
        }
        case GroupActions.SAVE_GROUP_SUCCESS: {
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
        case GroupActions.DELETE_GROUP_SUCCESS: {
            return state.filter(group => {
                return group.id !== action.payload.id;
            });
        }
        default: {
            return state;
        }
    }
}