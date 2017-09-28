import { ActionWithPayload } from '../actions/actionWithPayload';
import { GroupList } from '../actions/actionWithPayload';

import { Group } from '../models/group';
import { GroupActions } from '../actions/group.actions';

export type GroupListState = { groups: Group[], total: number, filter: string };

const initialState: GroupListState = { groups: [], total: 0, filter: "" };

export default function (state = initialState, action: ActionWithPayload<GroupList>): GroupListState {
    switch (action.type) {
        case GroupActions.LOAD_GROUPS_SUCCESS: {
            return Object.assign({}, state, {
                groups: action.payload.groupList,
                total: action.payload.total,
                filter: action.payload.filter
            });
        }
        case GroupActions.LOAD_AVAILABLE_USER_GROUPS_SUCCESS: {
            if (action.payload.filter == state.filter) {
                return Object.assign({}, state, {
                    groups: [...state.groups, ...action.payload.groupList],
                    total: action.payload.total
                });                     
            }
            else {
                return Object.assign({}, state, {
                    groups: action.payload.groupList,
                    total: action.payload.total,
                    filter: action.payload.filter
                });
            }
        }
        case GroupActions.LOAD_AVAILABLE_TEACHER_GROUPS_SUCCESS: {
            if (action.payload.filter == state.filter) {
                return Object.assign({}, state, {
                    groups: [...state.groups, ...action.payload.groupList],
                    total: action.payload.total
                });
            }
            else {
                return Object.assign({}, state, {
                    groups: action.payload.groupList,
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
