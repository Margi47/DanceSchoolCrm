 import { Action } from '@ngrx/store';

import { User } from '../models/user';
import { UserActions } from '../actions/user.actions';

export type UserState = User;

const initialState: UserState = {
    id: 0,
    name: '',
    phone: '',
    email: '',
    isActive: false,
    isAdmin: false,
    isTeacher: false,
    groups: []
};

export default function (state = initialState, action: Action): UserState {
    switch (action.type) {
        case UserActions.GET_USER_SUCCESS: {
            return Object.assign({}, state, {
                id: action.payload.id,
                name: action.payload.name,
                phone: action.payload.phone,
                email: action.payload.email,
                isActive: action.payload.isActive,
                isAdmin: action.payload.isAdmin,
                isTeacher: action.payload.isTeacher,
            });;
        }
        case UserActions.LOAD_USER_GROUPS_SUCCESS: {
            return Object.assign({}, state, { groups: action.payload });
        }
        default: {
            return state;
        }
    }
}