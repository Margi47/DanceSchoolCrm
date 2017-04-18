import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user';
import { UserActions } from '../actions/user.actions';
import * as _ from 'lodash';

export type UserListState = User[];

const initialState: UserListState = [];

export default function (state = initialState, action: Action): UserListState {
    switch (action.type) {
        case UserActions.LOAD_USERS_SUCCESS: {
            return action.payload;
        }
        case UserActions.ADD_USER_SUCCESS: {
            return [...state, action.payload];
        }
        case UserActions.SAVE_USER_SUCCESS: {
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
        case UserActions.DELETE_USER_SUCCESS: {
            return state.filter(user => {
                return user.id !== action.payload.id;
            });
        }
        default: {
            return state;
        }
    }
}