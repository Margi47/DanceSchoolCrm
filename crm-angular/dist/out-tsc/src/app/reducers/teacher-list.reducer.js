"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var teacher_actions_1 = require("../actions/teacher.actions");
var initialState = { teachers: [], total: 0 };
function default_1(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case teacher_actions_1.TeacherActions.LOAD_ALL_TEACHERS_SUCCESS: {
            return Object.assign({}, state, { teachers: action.payload.teacherList, total: action.payload.total });
        }
        case teacher_actions_1.TeacherActions.LOAD_AVAILABLE_TEACHERS_SUCCESS: {
            return Object.assign({}, state, {
                teachers: state.teachers.concat(action.payload.teacherList),
                total: action.payload.total
            });
        }
        default: {
            return state;
        }
    }
}
exports.default = default_1;
//# sourceMappingURL=teacher-list.reducer.js.map