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
var RouterActions = (function () {
    function RouterActions() {
    }
    RouterActions.prototype.Go = function (path, query, extras) {
        return {
            type: UserActions.GO,
            payload: new actionWithPayload_1.NavigationPayload(path, query, extras)
        };
    };
    RouterActions.prototype.Back = function () {
        return {
            type: UserActions.BACK,
            payload: null
        };
    };
    RouterActions.prototype.Forward = function () {
        return {
            type: UserActions.FORWARD,
            payload: null
        };
    };
    return RouterActions;
}());
RouterActions.GO = '[Navigation] Go';
RouterActions.BACK = '[Navigation] Go Back';
RouterActions.FORWARD = '[Navigation] Go Forward';
RouterActions = __decorate([
    core_1.Injectable()
], RouterActions);
exports.RouterActions = RouterActions;
//# sourceMappingURL=router.actions.js.map