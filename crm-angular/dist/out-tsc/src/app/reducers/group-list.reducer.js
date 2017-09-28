"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var group_actions_1 = require("../actions/group.actions");
var initialState = { groups: [], total: 0, filter: "" };
function default_1(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case group_actions_1.GroupActions.LOAD_GROUPS_SUCCESS: {
            return Object.assign({}, state, {
                groups: action.payload.groupList,
                total: action.payload.total,
                filter: action.payload.filter
            });
        }
        case group_actions_1.GroupActions.LOAD_AVAILABLE_USER_GROUPS_SUCCESS: {
            if (action.payload.filter == state.filter) {
                return Object.assign({}, state, {
                    groups: state.groups.concat(action.payload.groupList),
                    total: action.payload.total,
                    filter: action.payload.filter
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
        case group_actions_1.GroupActions.LOAD_AVAILABLE_TEACHER_GROUPS_SUCCESS: {
            if (action.payload.filter == state.filter) {
                return Object.assign({}, state, {
                    groups: state.groups.concat(action.payload.groupList),
                    total: action.payload.total,
                    filter: action.payload.filter
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
exports.default = default_1;
//# sourceMappingURL=group-list.reducer.js.map