"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var store_1 = require("@ngrx/store");
var user_actions_1 = require("../../actions/user.actions");
var error_actions_1 = require("../../actions/error.actions");
var router_actions_1 = require("../../actions/router.actions");
var UserAddComponent = (function () {
    function UserAddComponent(routerActions, store, userActions, errorActions) {
        this.routerActions = routerActions;
        this.store = store;
        this.userActions = userActions;
        this.errorActions = errorActions;
        this.errors$ = this.store.select('errorFields');
    }
    UserAddComponent.prototype.onUserSubmit = function (user) {
        this.store.dispatch(this.userActions.addUser(user));
    };
    UserAddComponent.prototype.onUserCancel = function () {
        this.store.dispatch(this.routerActions.back());
    };
    return UserAddComponent;
}());
UserAddComponent = __decorate([
    core_1.Component({
        selector: 'add-user',
        template: "\n<div  class=\"col-sm-6\">\n    <user-add-form \n            [errors] = \"errors$ | async\"\n            (userSave)=\"onUserSubmit($event)\" \n            (userCancel)=\"onUserCancel()\">\n    </user-add-form>\n</div>"
    }),
    __metadata("design:paramtypes", [router_actions_1.RouterActions,
        store_1.Store,
        user_actions_1.UserActions,
        error_actions_1.ErrorActions])
], UserAddComponent);
exports.UserAddComponent = UserAddComponent;
//# sourceMappingURL=user-add.component.js.map