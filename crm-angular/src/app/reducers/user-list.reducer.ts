import { Action } from '@ngrx/store';
import { ActionWithPayload } from '../actions/actionWithPayload';
import { UserList } from '../actions/actionWithPayload'

import { User } from '../models/user';
import { UserActions } from '../actions/user.actions';

export type UserListState = { users: User[], total: number, filter: string };

const initialState: UserListState = { users: [], total: 0, filter: ""};

export default function (state = initialState, action: ActionWithPayload<UserList>): UserListState {
    console.log(action);
    switch (action.type) {
        case UserActions.LOAD_USERS_SUCCESS: {
            
            return Object.assign({}, state, {
                users: action.payload.userList,
                total: action.payload.total,
                filter: action.payload.filter
            });
        }
        case UserActions.LOAD_AVAILABLE_STUDENTS_SUCCESS: {
            if (action.payload.filter == state.filter) {
                return Object.assign({}, state, {
                    users: [...state.users, ...action.payload.userList],
                    total: action.payload.total,
                    filter: action.payload.filter
                });
            }
            else {
                return Object.assign({}, state, {
                    users: action.payload.userList,
                    total: action.payload.total,
                    filter: action.payload.filter
                });
            }
        }
        case UserActions.LOAD_AVAILABLE_TEACHERS_SUCCESS: {
            if (action.payload.filter == state.filter) {
                return Object.assign({}, state, {
                    users: [...state.users, ...action.payload.userList],
                    total: action.payload.total,
                    filter: action.payload.filter
                });
            }
            else {
                return Object.assign({}, state, {
                    users: action.payload.userList,
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
