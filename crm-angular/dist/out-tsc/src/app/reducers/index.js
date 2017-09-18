"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fromRouter = require("@ngrx/router-store");
var group_list_reducer_1 = require("./group-list.reducer");
var group_reducer_1 = require("./group.reducer");
var user_list_reducer_1 = require("./user-list.reducer");
var user_reducer_1 = require("./user.reducer");
var teacher_list_reducer_1 = require("./teacher-list.reducer");
var teacher_reducer_1 = require("./teacher.reducer");
var error_message_reducer_1 = require("./error-message.reducer");
var form_error_reducer_1 = require("./form-error.reducer");
;
exports.reducers = {
    groups: group_list_reducer_1.default,
    group: group_reducer_1.default,
    users: user_list_reducer_1.default,
    user: user_reducer_1.default,
    teachers: teacher_list_reducer_1.default,
    teacher: teacher_reducer_1.default,
    errorMessage: error_message_reducer_1.default,
    errorFields: form_error_reducer_1.default,
    routerReducer: fromRouter.routerReducer
};
//# sourceMappingURL=index.js.map