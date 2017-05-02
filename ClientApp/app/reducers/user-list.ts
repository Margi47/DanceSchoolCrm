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
        default: {
            return state;
        }
    }
}