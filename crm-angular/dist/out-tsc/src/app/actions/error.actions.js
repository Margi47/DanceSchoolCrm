"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var actionWithPayload_1 = require("../actions/actionWithPayload");
var ErrorActions = ErrorActions_1 = (function () {
    function ErrorActions() {
    }
    ErrorActions.prototype.catchError = function (code, error) {
        return {
            type: ErrorActions_1.CATCH_ERROR,
            payload: new actionWithPayload_1.ErrorPayload(code, error)
        };
    };
    ErrorActions.prototype.removeError = function () {
        return {
            type: ErrorActions_1.REMOVE_ERROR,
            payload: null
        };
    };
    ErrorActions.prototype.catchValidationError = function (code, error) {
        return {
            type: ErrorActions_1.CATCH_VALIDATION_ERROR,
            payload: new actionWithPayload_1.ErrorPayload(code, error)
        };
    };
    ErrorActions.prototype.removeValidationError = function () {
        return {
            type: ErrorActions_1.REMOVE_VALIDATION_ERROR,
            payload: null
        };
    };
    return ErrorActions;
}());
ErrorActions.CATCH_ERROR = '[Error] Catch Error';
ErrorActions.REMOVE_ERROR = '[Error] Remove Error';
ErrorActions.CATCH_VALIDATION_ERROR = '[Error] Catch Validation Error';
ErrorActions.REMOVE_VALIDATION_ERROR = '[Error] Remove Validation Error';
ErrorActions = ErrorActions_1 = __decorate([
    core_1.Injectable()
], ErrorActions);
exports.ErrorActions = ErrorActions;
var ErrorActions_1;
//# sourceMappingURL=error.actions.js.map