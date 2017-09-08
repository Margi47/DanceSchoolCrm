"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var teacher_actions_1 = require("../actions/teacher.actions");
var initialState = {
    id: 0,
    name: '',
    groups: [],
    styles: []
};
function default_1(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case teacher_actions_1.TeacherActions.GET_TEACHER_SUCCESS: {
            action = action;
            return Object.assign({}, state, {
                id: action.payload.id,
                name: action.payload.name
            });
        }
        case teacher_actions_1.TeacherActions.GET_TEACHER_GROUPS_SUCCESS: {
            action = action;
            return Object.assign({}, state, { groups: action.payload });
        }
        default: {
            return state;
        }
    }
}
exports.default = default_1;
//# sourceMappingURL=teacher.reducer.js.map