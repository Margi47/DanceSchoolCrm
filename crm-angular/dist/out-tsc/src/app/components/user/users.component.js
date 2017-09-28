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
var router_actions_1 = require("../../actions/router.actions");
var UsersComponent = (function () {
    function UsersComponent(routerActions, store, userActions) {
        this.routerActions = routerActions;
        this.store = store;
        this.userActions = userActions;
        this.users$ = store.select('users');
    }
    UsersComponent.prototype.ngOnInit = function () {
        this.store.dispatch(this.userActions.loadUsers(1, ""));
    };
    ;
    UsersComponent.prototype.addUser = function () {
        this.store.dispatch(this.routerActions.show(['useradd']));
    };
    UsersComponent.prototype.showDetails = function (id) {
        this.store.dispatch(this.routerActions.go(['userdetail', id]));
    };
    UsersComponent.prototype.loadUsers = function (data) {
        console.log(data.filter);
        this.store.dispatch(this.userActions.loadUsers(data.page, data.filter));
    };
    return UsersComponent;
}());
UsersComponent = __decorate([
    core_1.Component({
        selector: 'users',
        template: "\n<users-list [users] = \"users$ | async\" \n            (add)=\"addUser()\" \n            (details)=\"showDetails($event)\"\n            (loadUsers)=\"loadUsers($event)\">\n</users-list>\n"
    }),
    __metadata("design:paramtypes", [router_actions_1.RouterActions,
        store_1.Store,
        user_actions_1.UserActions])
], UsersComponent);
exports.UsersComponent = UsersComponent;
//# sourceMappingURL=users.component.js.map