import { ActionWithPayload } from '../actions/actionWithPayload';
import { Group } from '../models/group';
import { User } from '../models/user';
import { Teacher } from '../models/teacher';
import { GroupActions } from '../actions/group.actions';

export type GroupState = Group;

const initialState: GroupState = {
    id: 0,
    name: '',
    description: '',
    isActive: false,
    students: [],
    teachers: []
};

export default function (state = initialState, action: ActionWithPayload<Group> | ActionWithPayload<User[]>
    | ActionWithPayload<Teacher[]>): GroupState {
    switch (action.type) {
        case GroupActions.GET_GROUP_SUCCESS: {
            action = action as ActionWithPayload<Group>;
            return Object.assign({}, state, {
                id: action.payload.id,
                name: action.payload.name,
                description: action.payload.description,
                isActive: action.payload.isActive
            });
        }
        case GroupActions.LOAD_STUDENTS_SUCCESS: {
            action = action as ActionWithPayload<User[]>;
            return Object.assign({}, state, { students: action.payload });
        }
        case GroupActions.LOAD_TEACHERS_SUCCESS: {
            action = action as ActionWithPayload<Teacher[]>;
            return Object.assign({}, state, { teachers: action.payload });
        }
        default: {
            return state;
        }
    }
}
