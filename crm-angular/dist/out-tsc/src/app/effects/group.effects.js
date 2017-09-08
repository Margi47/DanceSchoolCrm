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
var router_1 = require("@angular/router");
var group_actions_1 = require("../actions/group.actions");
var user_actions_1 = require("../actions/user.actions");
var teacher_actions_1 = require("../actions/teacher.actions");
var error_actions_1 = require("../actions/error.actions");
var group_service_1 = require("../services/group.service");
var GroupEffects = (function () {
    function GroupEffects(update$, groupActions, userActions, teacherActions, errorActions, service, router) {
        var _this = this;
        this.update$ = update$;
        this.groupActions = groupActions;
        this.userActions = userActions;
        this.teacherActions = teacherActions;
        this.errorActions = errorActions;
        this.service = service;
        this.router = router;
        this.loadGroups$ = this.update$
            .ofType(group_actions_1.GroupActions.LOAD_GROUPS)
            .map(function (action) { return action.payload; })
            .switchMap(function (page) { return _this.service.getGroups(page)
            .map(function (groups) { return _this.groupActions.loadGroupsSuccess(groups.data, groups.total); })
            .catch(function (error) { return Observable_1.Observable.of(_this.errorActions.catchError(error.status, JSON.parse(error._body))); }); });
        this.getGroup$ = this.update$
            .ofType(group_actions_1.GroupActions.GET_GROUP)
            .map(function (action) { return action.payload; })
            .switchMap(function (id) { return _this.service.getGroup(id)
            .map(function (group) { return _this.groupActions.getGroupSuccess(group); })
            .catch(function (error) { return Observable_1.Observable.of(_this.errorActions.catchError(error.status, JSON.parse(error._body))); }); });
        this.getAvailableUserGroup$ = this.update$
            .ofType(group_actions_1.GroupActions.LOAD_AVAILABLE_USER_GROUPS)
            .map(function (action) { return action.payload; })
            .switchMap(function (data) { return _this.service.getAvailableUserGroups(data.userId, data.page)
            .map(function (groups) { return _this.groupActions.loadAvailableUserGroupsSuccess(groups.data, groups.total); })
            .catch(function (error) { return Observable_1.Observable.of(_this.errorActions.catchError(error.status, JSON.parse(error._body))); }); });
        this.getAvailableTeacherGroup$ = this.update$
            .ofType(group_actions_1.GroupActions.LOAD_AVAILABLE_TEACHER_GROUPS)
            .map(function (action) { return action.payload; })
            .switchMap(function (data) { return _this.service.getAvailableTeacherGroups(data.userId, data.page)
            .map(function (groups) { return _this.groupActions.loadAvailableTeacherGroupsSuccess(groups.data, groups.total); })
            .catch(function (error) { return Observable_1.Observable.of(_this.errorActions.catchError(error.status, JSON.parse(error._body))); }); });
        this.saveGroup$ = this.update$
            .ofType(group_actions_1.GroupActions.SAVE_GROUP)
            .map(function (action) { return action.payload; })
            .switchMap(function (group) { return _this.service.update(group)
            .map(function () { return _this.groupActions.loadGroups(1); })
            .catch(function (error) { return Observable_1.Observable.of(_this.errorActions.catchError(error.status, JSON.parse(error._body))); }); });
        this.addGroup$ = this.update$
            .ofType(group_actions_1.GroupActions.ADD_GROUP)
            .map(function (action) { return action.payload; })
            .switchMap(function (group) { return _this.service.addGroup(group)
            .map(function (group) { return _this.groupActions.addGroupSuccess(group); })
            .catch(function (error) {
            var body = JSON.parse(error._body);
            return body.result ?
                Observable_1.Observable.of(_this.errorActions.catchValidationError(error.status, body)) :
                Observable_1.Observable.of(_this.errorActions.catchError(error.status, JSON.parse(error._body)));
        }); });
        this.navigateToDetails = this.update$
            .ofType(group_actions_1.GroupActions.ADD_GROUP_SUCCESS)
            .map(function (action) { return _this.router.navigate(['groupdetail', action.payload]); });
        this.getMainMessage = this.update$
            .ofType(error_actions_1.ErrorActions.CATCH_VALIDATION_ERROR)
            .map(function (action) {
            return _this.errorActions.catchError(action.payload.code, action.payload.error);
        });
        this.deleteGroup$ = this.update$
            .ofType(group_actions_1.GroupActions.DELETE_GROUP)
            .map(function (action) { return action.payload; })
            .switchMap(function (group) { return _this.service.deleteGroup(group)
            .map(function () { return _this.groupActions.loadGroups(1); })
            .catch(function (error) { return Observable_1.Observable.of(_this.errorActions.catchError(error.status, JSON.parse(error._body))); }); });
        this.loadTeachers$ = this.update$
            .ofType(group_actions_1.GroupActions.LOAD_TEACHERS)
            .map(function (action) { return action.payload; })
            .switchMap(function (group) { return _this.service.getTeachers(group)
            .map(function (teachers) { return _this.groupActions.loadTeachesSuccess(teachers); })
            .catch(function (error) { return Observable_1.Observable.of(_this.errorActions.catchError(error.status, JSON.parse(error._body))); }); });
        this.addGroupTeacher$ = this.update$
            .ofType(group_actions_1.GroupActions.ADD_TEACHER)
            .map(function (action) { return action.payload; })
            .switchMap(function (obj) { return _this.service.addTeacher(obj.groupId, obj.teacherId)
            .map(function (group) { return _this.groupActions.changeGroupTeachersSuccess(group); })
            .catch(function (error) { return Observable_1.Observable.of(_this.errorActions.catchError(error.status, JSON.parse(error._body))); }); });
        this.removeTeacher = this.update$
            .ofType(group_actions_1.GroupActions.REMOVE_TEACHER)
            .map(function (action) { return action.payload; })
            .switchMap(function (obj) { return _this.service.removeTeacher(obj.groupId, obj.teacherId)
            .map(function (group) { return _this.groupActions.changeGroupTeachersSuccess(group); })
            .catch(function (error) { return Observable_1.Observable.of(_this.errorActions.catchError(error.status, JSON.parse(error._body))); }); });
        this.changeGroupTeachers = this.update$
            .ofType(group_actions_1.GroupActions.CHANGE_GROUP_TEACHERS_SUCCESS)
            .map(function (action) { return _this.groupActions.loadTeaches(action.payload); });
        this.changeAvailableGroupTeachers = this.update$
            .ofType(group_actions_1.GroupActions.CHANGE_GROUP_TEACHERS_SUCCESS)
            .map(function (action) {
            return _this.teacherActions.loadAvailableTeachers(action.payload, 1);
        });
        this.loadStudents$ = this.update$
            .ofType(group_actions_1.GroupActions.LOAD_STUDENTS)
            .map(function (action) { return action.payload; })
            .switchMap(function (group) { return _this.service.getStudents(group)
            .map(function (users) { return _this.groupActions.loadStudentsSuccess(users); })
            .catch(function (error) { return Observable_1.Observable.of(_this.errorActions.catchError(error.status, JSON.parse(error._body))); }); });
        this.addGroupStudent$ = this.update$
            .ofType(group_actions_1.GroupActions.ADD_STUDENT)
            .map(function (action) { return action.payload; })
            .switchMap(function (obj) { return _this.service.addStudent(obj.groupId, obj.userId)
            .map(function (group) { return _this.groupActions.changeGroupStudentsSuccess(group); })
            .catch(function (error) { return Observable_1.Observable.of(_this.errorActions.catchError(error.status, JSON.parse(error._body))); }); });
        this.removeStudent = this.update$
            .ofType(group_actions_1.GroupActions.REMOVE_STUDENT)
            .map(function (action) { return action.payload; })
            .switchMap(function (obj) { return _this.service.removeStudent(obj.groupId, obj.userId)
            .map(function (group) { return _this.groupActions.changeGroupStudentsSuccess(group); })
            .catch(function (error) { return Observable_1.Observable.of(_this.errorActions.catchError(error.status, JSON.parse(error._body))); }); });
        this.changeGroupStudents = this.update$
            .ofType(group_actions_1.GroupActions.CHANGE_GROUP_STUDENTS_SUCCESS)
            .map(function (action) { return _this.groupActions.loadStudents(action.payload); });
        this.changeAvailableGroupStudents = this.update$
            .ofType(group_actions_1.GroupActions.CHANGE_GROUP_STUDENTS_SUCCESS)
            .map(function (action) { return _this.userActions.loadAvailableStudents(action.payload, 1); });
        this.removeError = this.update$
            .ofType(group_actions_1.GroupActions.LOAD_GROUPS_SUCCESS, group_actions_1.GroupActions.GET_GROUP_SUCCESS, group_actions_1.GroupActions.LOAD_STUDENTS_SUCCESS, group_actions_1.GroupActions.LOAD_TEACHERS_SUCCESS, group_actions_1.GroupActions.LOAD_AVAILABLE_TEACHER_GROUPS_SUCCESS, group_actions_1.GroupActions.LOAD_AVAILABLE_USER_GROUPS_SUCCESS, group_actions_1.GroupActions.CHANGE_GROUP_STUDENTS_SUCCESS, group_actions_1.GroupActions.CHANGE_GROUP_TEACHERS_SUCCESS, group_actions_1.GroupActions.ADD_GROUP_SUCCESS)
            .map(function (users) { return _this.errorActions.removeError(); });
    }
    return GroupEffects;
}());
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], GroupEffects.prototype, "loadGroups$", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], GroupEffects.prototype, "getGroup$", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], GroupEffects.prototype, "getAvailableUserGroup$", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], GroupEffects.prototype, "getAvailableTeacherGroup$", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], GroupEffects.prototype, "saveGroup$", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], GroupEffects.prototype, "addGroup$", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], GroupEffects.prototype, "navigateToDetails", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], GroupEffects.prototype, "getMainMessage", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], GroupEffects.prototype, "deleteGroup$", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], GroupEffects.prototype, "loadTeachers$", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], GroupEffects.prototype, "addGroupTeacher$", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], GroupEffects.prototype, "removeTeacher", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], GroupEffects.prototype, "changeGroupTeachers", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], GroupEffects.prototype, "changeAvailableGroupTeachers", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], GroupEffects.prototype, "loadStudents$", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], GroupEffects.prototype, "addGroupStudent$", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], GroupEffects.prototype, "removeStudent", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], GroupEffects.prototype, "changeGroupStudents", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], GroupEffects.prototype, "changeAvailableGroupStudents", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], GroupEffects.prototype, "removeError", void 0);
GroupEffects = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [effects_1.Actions,
        group_actions_1.GroupActions,
        user_actions_1.UserActions,
        teacher_actions_1.TeacherActions,
        error_actions_1.ErrorActions,
        group_service_1.GroupService,
        router_1.Router])
], GroupEffects);
exports.GroupEffects = GroupEffects;
//# sourceMappingURL=group.effects.js.map