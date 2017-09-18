"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var actionWithPayload_1 = require("../actions/actionWithPayload");
var RouterActions = RouterActions_1 = (function () {
    function RouterActions() {
    }
    RouterActions.prototype.go = function (path, query, extras) {
        return {
            type: RouterActions_1.GO,
            payload: new actionWithPayload_1.NavigationPayload(path, query, extras)
        };
    };
    RouterActions.prototype.show = function (path, query, extras) {
        return {
            type: RouterActions_1.SHOW,
            payload: new actionWithPayload_1.NavigationPayload(path, query, __assign({}, extras, { skipLocationChange: true }))
        };
    };
    RouterActions.prototype.back = function () {
        return {
            type: RouterActions_1.BACK,
            payload: null
        };
    };
    RouterActions.prototype.forward = function () {
        return {
            type: RouterActions_1.FORWARD,
            payload: null
        };
    };
    return RouterActions;
}());
RouterActions.GO = '[Navigation] Go';
RouterActions.SHOW = '[Navigation] Show';
RouterActions.BACK = '[Navigation] Go Back';
RouterActions.FORWARD = '[Navigation] Go Forward';
RouterActions = RouterActions_1 = __decorate([
    core_1.Injectable()
], RouterActions);
exports.RouterActions = RouterActions;
var RouterActions_1;
//# sourceMappingURL=router.actions.js.map