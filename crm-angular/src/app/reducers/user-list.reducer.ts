import { Action } from '@ngrx/store';
import { ActionWithPayload } from '../actions/actionWithPayload';
import { UserList } from '../actions/actionWithPayload'

import { User } from '../models/user';
import { UserActions } from '../actions/user.actions';

export type UserListState = { users: User[], total: number };

const initialState: UserListState = { users: [], total: 0};

export default function (state = initialState, action: ActionWithPayload<UserList>): UserListState {
    console.log(action);
    switch (action.type) {
        case UserActions.LOAD_USERS_SUCCESS: {
            
            return Object.assign({}, state, { users: action.payload.userList, total: action.payload.total });
        }
        case UserActions.LOAD_AVAILABLE_STUDENTS_SUCCESS: {
            return Object.assign({}, state, {
                users: [...state.users, ...action.payload.userList],
                total: action.payload.total
            });
        }
        case UserActions.LOAD_AVAILABLE_TEACHERS_SUCCESS: {
            console.log(action.payload);
            return Object.assign({}, state, {
                users: [...state.users, ...action.payload.userList],
                total: action.payload.total
            });
        }
        default: {
            return state;
        }
    }
}
