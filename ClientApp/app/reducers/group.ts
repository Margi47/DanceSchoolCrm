import { Action } from '@ngrx/store';

import { Group } from '../models/group';
import { GroupActions } from '../actions/group.actions';

export type GroupState = Group;

const initialState: GroupState = {
    id: 0,
    name: '',
    description: '',
    active: false
};

export default function (state = initialState, action: Action): GroupState {
    switch (action.type) {
        case GroupActions.RESET_BLANK_GROUP: {
            return initialState;
        }
        case GroupActions.GET_GROUP_SUCCESS: {
            return action.payload;
        }
        default: {
            return state;
        }
    }
}