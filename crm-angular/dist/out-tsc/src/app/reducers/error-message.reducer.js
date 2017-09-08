"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var error_actions_1 = require("../actions/error.actions");
var initialState = {
    statusCode: 0,
    message: ''
};
function default_1(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case error_actions_1.ErrorActions.CATCH_ERROR: {
            var obj = Object.assign({}, state);
            obj.message = action.payload.error.message;
            obj.statusCode = action.payload.code;
            return obj;
        }
        case error_actions_1.ErrorActions.REMOVE_ERROR: {
            return Object.assign({}, initialState);
        }
        default: {
            return state;
        }
    }
}
exports.default = default_1;
//# sourceMappingURL=error-message.reducer.js.map