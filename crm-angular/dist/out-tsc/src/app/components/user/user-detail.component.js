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
var router_1 = require("@angular/router");
var store_1 = require("@ngrx/store");
var user_actions_1 = require("../../actions/user.actions");
var group_actions_1 = require("../../actions/group.actions");
var error_actions_1 = require("../../actions/error.actions");
var router_actions_1 = require("../../actions/router.actions");
var common_1 = require("@angular/common");
var UserDetailComponent = (function () {
    function UserDetailComponent(routerActions, route, store, userActions, groupActions, errorActions, location) {
        this.routerActions = routerActions;
        this.route = route;
        this.store = store;
        this.userActions = userActions;
        this.groupActions = groupActions;
        this.errorActions = errorActions;
        this.location = location;
        this.model$ = this.store.select('user');
        this.allGroups$ = this.store.select('groups');
        this.errors$ = this.store.select('errorFields');
    }
    UserDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.store.dispatch(_this.userActions.getUser(+params['id']));
            _this.store.dispatch(_this.userActions.loadUserGroups(+params['id']));
            _this.store.dispatch(_this.groupActions.loadAvailableUserGroups(+params['id'], 1, ""));
        });
    };
    UserDetailComponent.prototype.onUserDelete = function (user) {
        this.store.dispatch(this.userActions.deleteUser(user.id));
    };
    UserDetailComponent.prototype.onUserSubmit = function (user) {
        this.store.dispatch(this.userActions.saveUser(user));
    };
    UserDetailComponent.prototype.onLoadNextGroups = function ($event) {
        this.store.dispatch(this.groupActions.loadAvailableUserGroups($event.user, $event.page, $event.filter));
    };
    UserDetailComponent.prototype.onAddGroup = function ($event) {
        this.store.dispatch(this.userActions.addUserGroup($event.userId, $event.groupId));
    };
    UserDetailComponent.prototype.onShowGroupDetails = function (groupId) {
        this.store.dispatch(this.routerActions.go(['/groupdetail', groupId]));
    };
    UserDetailComponent.prototype.removeUserGroup = function ($event) {
        this.store.dispatch(this.userActions.removeUserGroup($event.userId, $event.groupId));
    };
    UserDetailComponent.prototype.goToTeacher = function (id) {
        this.store.dispatch(this.routerActions.go(['/teacherdetail', id]));
    };
    UserDetailComponent.prototype.isTeacherChanged = function ($event) {
        if ($event.value) {
            this.store.dispatch(this.userActions.createTeacher($event.user));
        }
        else {
            this.store.dispatch(this.userActions.deleteTeacher($event.user.id));
        }
    };
    UserDetailComponent.prototype.goBack = function () {
        this.store.dispatch(this.routerActions.back());
        this.store.dispatch(this.errorActions.removeError());
    };
    return UserDetailComponent;
}());
UserDetailComponent = __decorate([
    core_1.Component({
        selector: 'user-detail',
        template: "\n<div  class=\"col-sm-6\">\n    <button (click)=\"goBack()\" class=\"btn btn-default\">Back</button>\n    <user-detail-form [model] = \"model$ | async\" \n                      [allGroups] = \"allGroups$ | async\"\n                      [errors] = \"errors$ | async\"\n                      (userSubmit)=\"onUserSubmit($event)\" \n                      (userDelete)=\"onUserDelete($event)\"\n                      (loadNextGroups)=\"onLoadNextGroups($event)\"\n                      (addUserGroup)=\"onAddGroup($event)\"\n                      (showGroupDetails)=\"onShowGroupDetails($event)\"\n                      (removeUserGroup)=\"removeUserGroup($event)\"\n                      (goToTeacher)=\"goToTeacher($event)\"\n                      (isTeacherChanged)=\"isTeacherChanged($event)\">\n    </user-detail-form>\n</div>"
    }),
    __metadata("design:paramtypes", [router_actions_1.RouterActions,
        router_1.ActivatedRoute,
        store_1.Store,
        user_actions_1.UserActions,
        group_actions_1.GroupActions,
        error_actions_1.ErrorActions,
        common_1.Location])
], UserDetailComponent);
exports.UserDetailComponent = UserDetailComponent;
//# sourceMappingURL=user-detail.component.js.map