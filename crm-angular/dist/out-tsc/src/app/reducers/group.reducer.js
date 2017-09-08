"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var group_actions_1 = require("../actions/group.actions");
var initialState = {
    id: 0,
    name: '',
    description: '',
    isActive: false,
    students: [],
    teachers: []
};
function default_1(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case group_actions_1.GroupActions.GET_GROUP_SUCCESS: {
            action = action;
            return Object.assign({}, state, {
                id: action.payload.id,
                name: action.payload.name,
                description: action.payload.description,
                isActive: action.payload.isActive
            });
        }
        case group_actions_1.GroupActions.LOAD_STUDENTS_SUCCESS: {
            action = action;
            return Object.assign({}, state, { students: action.payload });
        }
        case group_actions_1.GroupActions.LOAD_TEACHERS_SUCCESS: {
            action = action;
            return Object.assign({}, state, { teachers: action.payload });
        }
        default: {
            return state;
        }
    }
}
exports.default = default_1;
//# sourceMappingURL=group.reducer.js.map