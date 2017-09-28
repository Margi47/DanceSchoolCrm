"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_actions_1 = require("../actions/user.actions");
var initialState = { users: [], total: 0, filter: "" };
function default_1(state, action) {
    if (state === void 0) { state = initialState; }
    console.log(action);
    switch (action.type) {
        case user_actions_1.UserActions.LOAD_USERS_SUCCESS: {
            return Object.assign({}, state, {
                users: action.payload.userList,
                total: action.payload.total,
                filter: action.payload.filter
            });
        }
        case user_actions_1.UserActions.LOAD_AVAILABLE_STUDENTS_SUCCESS: {
            if (action.payload.filter == state.filter) {
                return Object.assign({}, state, {
                    users: state.users.concat(action.payload.userList),
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
        case user_actions_1.UserActions.LOAD_AVAILABLE_TEACHERS_SUCCESS: {
            if (action.payload.filter == state.filter) {
                return Object.assign({}, state, {
                    users: state.users.concat(action.payload.userList),
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
exports.default = default_1;
//# sourceMappingURL=user-list.reducer.js.map