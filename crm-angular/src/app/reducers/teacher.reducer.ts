import { ActionWithPayload } from '../actions/actionWithPayload';

import { Teacher } from '../models/teacher';
import { Group } from '../models/group';
import { TeacherActions } from '../actions/teacher.actions';


export type TeacherState = Teacher;

const initialState: TeacherState = {
    id: 0,
    name: '',
    groups: [],
    styles: []
};

export default function (state = initialState, action: ActionWithPayload<Teacher> | ActionWithPayload<Group[]>)
    : TeacherState {
    switch (action.type) {
        case TeacherActions.GET_TEACHER_SUCCESS: {
            action = action as ActionWithPayload<Teacher>;
            return Object.assign({}, state, {
                id: action.payload.id,
                name: action.payload.name
            });
        }
        case TeacherActions.GET_TEACHER_GROUPS_SUCCESS: {
            action = action as ActionWithPayload<Group[]>;
            return Object.assign({}, state, { groups: action.payload });
        }
        default: {
            return state;
        }
    }
}
