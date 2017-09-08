"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var error_actions_1 = require("../actions/error.actions");
var initialState = [];
function default_1(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case error_actions_1.ErrorActions.CATCH_VALIDATION_ERROR: {
            var result = [];
            var source = action.payload.error.result;
            for (var i in source) {
                if (source.hasOwnProperty(i)) {
                    var value = source[i];
                    var field = { key: i, reasons: value };
                    result = result.concat([field]);
                }
            }
            return result;
        }
        case error_actions_1.ErrorActions.REMOVE_VALIDATION_ERROR: {
            return Object.assign({}, initialState);
        }
        default: {
            return state;
        }
    }
}
exports.default = default_1;
//# sourceMappingURL=form-error.reducer.js.map