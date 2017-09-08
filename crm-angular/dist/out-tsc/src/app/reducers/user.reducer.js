"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_actions_1 = require("../actions/user.actions");
var initialState = {
    id: 0,
    name: '',
    phone: '',
    email: '',
    isActive: false,
    isAdmin: false,
    isTeacher: false,
    groups: []
};
function default_1(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case user_actions_1.UserActions.GET_USER_SUCCESS: {
            action = action;
            return Object.assign({}, state, {
                id: action.payload.id,
                name: action.payload.name,
                phone: action.payload.phone,
                email: action.payload.email,
                isActive: action.payload.isActive,
                isAdmin: action.payload.isAdmin,
                isTeacher: action.payload.isTeacher,
            });
            ;
        }
        case user_actions_1.UserActions.LOAD_USER_GROUPS_SUCCESS: {
            action = action;
            return Object.assign({}, state, { groups: action.payload });
        }
        default: {
            return state;
        }
    }
}
exports.default = default_1;
//# sourceMappingURL=user.reducer.js.map