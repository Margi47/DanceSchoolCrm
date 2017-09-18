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
var effects_1 = require("@ngrx/effects");
require("rxjs/add/operator/switchMap");
require("rxjs/add/observable/of");
var Observable_1 = require("rxjs/Observable");
var user_actions_1 = require("../actions/user.actions");
var error_actions_1 = require("../actions/error.actions");
var group_actions_1 = require("../actions/group.actions");
var router_actions_1 = require("../actions/router.actions");
var user_service_1 = require("../services/user.service");
var UserEffects = (function () {
    function UserEffects(update$, userActions, errorActions, groupActions, routerActions, service) {
        var _this = this;
        this.update$ = update$;
        this.userActions = userActions;
        this.errorActions = errorActions;
        this.groupActions = groupActions;
        this.routerActions = routerActions;
        this.service = service;
        this.loadUsers$ = this.update$
            .ofType(user_actions_1.UserActions.LOAD_USERS)
            .map(function (action) { return action.payload; })
            .switchMap(function (page) { return _this.service.getUsers(page)
            .map(function (users) { return _this.userActions.loadUsersSuccess(users.data, users.total); })
            .catch(function (error) { return Observable_1.Observable.of(_this.errorActions.catchError(error.status, JSON.parse(error._body))); }); });
        this.getUser$ = this.update$
            .ofType(user_actions_1.UserActions.GET_USER)
            .map(function (action) { return action.payload; })
            .switchMap(function (id) { return _this.service.getUser(id)
            .map(function (user) { return _this.userActions.getUserSuccess(user); })
            .catch(function (error) { return Observable_1.Observable.of(_this.errorActions.catchError(error.status, JSON.parse(error._body))); }); });
        this.getAvailableStudents$ = this.update$
            .ofType(user_actions_1.UserActions.LOAD_AVAILABLE_STUDENTS)
            .map(function (action) { return action.payload; })
            .switchMap(function (g) { return _this.service.getAvailableStudents(g.groupId, g.page)
            .map(function (students) { return _this.userActions.loadAvailableStudentsSuccess(students.data, students.total); })
            .catch(function (error) { return Observable_1.Observable.of(_this.errorActions.catchError(error.status, JSON.parse(error._body))); }); });
        this.getAvailableTeachers$ = this.update$
            .ofType(user_actions_1.UserActions.LOAD_AVAILABLE_TEACHERS)
            .map(function (action) { return action.payload; })
            .switchMap(function (page) { return _this.service.getAvailableTeachers(page)
            .map(function (users) { return _this.userActions.loadAvailableTeachersSuccess(users.data, users.total); })
            .catch(function (error) { return Observable_1.Observable.of(_this.errorActions.catchError(error.status, JSON.parse(error._body))); }); });
        this.addUser$ = this.update$
            .ofType(user_actions_1.UserActions.ADD_USER)
            .map(function (action) { return action.payload; })
            .switchMap(function (user) { return _this.service.addUser(user)
            .map(function (user) { return _this.userActions.addUserSuccess(user); })
            .catch(function (error) {
            var body = JSON.parse(error._body);
            return body.result ?
                Observable_1.Observable.of(_this.errorActions.catchValidationError(error.status, body)) :
                Observable_1.Observable.of(_this.errorActions.catchError(error.status, JSON.parse(error._body)));
        }); });
        this.getMainMessage = this.update$
            .ofType(error_actions_1.ErrorActions.CATCH_VALIDATION_ERROR)
            .map(function (action) {
            return _this.errorActions.catchError(action.payload.code, action.payload.error);
        });
        this.navigateToDetails = this.update$
            .ofType(user_actions_1.UserActions.ADD_USER_SUCCESS)
            .map(function (action) { return _this.routerActions.go(['userdetail', action.payload]); });
        this.deleteUser$ = this.update$
            .ofType(user_actions_1.UserActions.DELETE_USER)
            .map(function (action) { return action.payload; })
            .switchMap(function (userId) { return _this.service.deleteUser(userId)
            .map(function () { return _this.userActions.loadUsers(1); })
            .catch(function (error) { return Observable_1.Observable.of(_this.errorActions.catchError(error.status, JSON.parse(error._body))); }); });
        this.saveUser$ = this.update$
            .ofType(user_actions_1.UserActions.SAVE_USER)
            .map(function (action) { return action.payload; })
            .switchMap(function (user) { return _this.service.update(user)
            .map(function () { return _this.userActions.loadUsers(1); })
            .catch(function (error) { return Observable_1.Observable.of(_this.errorActions.catchError(error.status, JSON.parse(error._body))); }); });
        this.loadUserGroups$ = this.update$
            .ofType(user_actions_1.UserActions.LOAD_USER_GROUPS)
            .map(function (action) { return action.payload; })
            .switchMap(function (user) { return _this.service.getUserGroups(user)
            .map(function (groups) { return _this.userActions.loadUserGroupsSuccess(groups); })
            .catch(function (error) { return Observable_1.Observable.of(_this.errorActions.catchError(error.status, JSON.parse(error._body))); }); });
        this.addUserGroup$ = this.update$
            .ofType(user_actions_1.UserActions.ADD_USER_GROUP)
            .map(function (action) { return action.payload; })
            .switchMap(function (obj) { return _this.service.addGroup(obj.userId, obj.groupId)
            .map(function (user) { return _this.userActions.changeUserGroupsSuccess(user); })
            .catch(function (error) { return Observable_1.Observable.of(_this.errorActions.catchError(error.status, JSON.parse(error._body))); }); });
        this.removeUserGroup$ = this.update$
            .ofType(user_actions_1.UserActions.REMOVE_USER_GROUP)
            .map(function (action) { return action.payload; })
            .switchMap(function (obj) { return _this.service.removeGroup(obj.userId, obj.groupId)
            .map(function (user) { return _this.userActions.changeUserGroupsSuccess(user); })
            .catch(function (error) { return Observable_1.Observable.of(_this.errorActions.catchError(error.status, JSON.parse(error._body))); }); });
        this.changeUserGroups = this.update$
            .ofType(user_actions_1.UserActions.CHANGE_USER_GROUPS_SUCCESS)
            .map(function (action) { return _this.userActions.loadUserGroups(action.payload); });
        this.changeUserPossibleGroups = this.update$
            .ofType(user_actions_1.UserActions.CHANGE_USER_GROUPS_SUCCESS)
            .map(function (action) {
            return _this.groupActions.loadAvailableUserGroups(action.payload, 1);
        });
        this.createTeacher = this.update$
            .ofType(user_actions_1.UserActions.CREATE_TEACHER)
            .map(function (action) { return action.payload; })
            .switchMap(function (user) { return _this.service.createTeacher(user)
            .map(function (user) { return _this.userActions.getUser(user); })
            .catch(function (error) { return Observable_1.Observable.of(_this.errorActions.catchError(error.status, JSON.parse(error._body))); }); });
        this.deleteTeacher$ = this.update$
            .ofType(user_actions_1.UserActions.DELETE_TEACHER)
            .map(function (action) { return action.payload; })
            .switchMap(function (id) { return _this.service.deleteTeacher(id)
            .map(function (user) { return _this.userActions.getUser(user); })
            .catch(function (error) { return Observable_1.Observable.of(_this.errorActions.catchError(error.status, JSON.parse(error._body))); }); });
        this.removeError = this.update$
            .ofType(user_actions_1.UserActions.LOAD_USERS_SUCCESS, user_actions_1.UserActions.GET_USER_SUCCESS, user_actions_1.UserActions.LOAD_USER_GROUPS_SUCCESS, user_actions_1.UserActions.LOAD_AVAILABLE_STUDENTS_SUCCESS, user_actions_1.UserActions.LOAD_AVAILABLE_TEACHERS_SUCCESS, user_actions_1.UserActions.CHANGE_USER_GROUPS_SUCCESS, user_actions_1.UserActions.ADD_USER_SUCCESS)
            .map(function (users) { return _this.errorActions.removeError(); });
        this.removeValidationError = this.update$
            .ofType(error_actions_1.ErrorActions.REMOVE_ERROR)
            .map(function (users) { return _this.errorActions.removeValidationError(); });
    }
    return UserEffects;
}());
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], UserEffects.prototype, "loadUsers$", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], UserEffects.prototype, "getUser$", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], UserEffects.prototype, "getAvailableStudents$", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], UserEffects.prototype, "getAvailableTeachers$", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], UserEffects.prototype, "addUser$", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], UserEffects.prototype, "getMainMessage", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], UserEffects.prototype, "navigateToDetails", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], UserEffects.prototype, "deleteUser$", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], UserEffects.prototype, "saveUser$", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], UserEffects.prototype, "loadUserGroups$", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], UserEffects.prototype, "addUserGroup$", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], UserEffects.prototype, "removeUserGroup$", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], UserEffects.prototype, "changeUserGroups", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], UserEffects.prototype, "changeUserPossibleGroups", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], UserEffects.prototype, "createTeacher", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], UserEffects.prototype, "deleteTeacher$", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], UserEffects.prototype, "removeError", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], UserEffects.prototype, "removeValidationError", void 0);
UserEffects = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [effects_1.Actions,
        user_actions_1.UserActions,
        error_actions_1.ErrorActions,
        group_actions_1.GroupActions,
        router_actions_1.RouterActions,
        user_service_1.UserService])
], UserEffects);
exports.UserEffects = UserEffects;
//# sourceMappingURL=user.effects.js.map