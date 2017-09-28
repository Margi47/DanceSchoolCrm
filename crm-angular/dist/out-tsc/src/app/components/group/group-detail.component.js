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
var group_actions_1 = require("../../actions/group.actions");
var user_actions_1 = require("../../actions/user.actions");
var teacher_actions_1 = require("../../actions/teacher.actions");
var error_actions_1 = require("../../actions/error.actions");
var router_actions_1 = require("../../actions/router.actions");
var GroupDetailComponent = (function () {
    function GroupDetailComponent(store, groupActions, userActions, teacherActions, routerActions, route, errorActions) {
        this.store = store;
        this.groupActions = groupActions;
        this.userActions = userActions;
        this.teacherActions = teacherActions;
        this.routerActions = routerActions;
        this.route = route;
        this.errorActions = errorActions;
        this.model$ = store.select('group');
        this.allStudents$ = store.select('users');
        this.allTeachers$ = store.select('teachers');
        this.errors$ = this.store.select('errorFields');
    }
    GroupDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.store.dispatch(_this.groupActions.getGroup(+params['id']));
            _this.store.dispatch(_this.groupActions.loadStudents(+params['id']));
            _this.store.dispatch(_this.groupActions.loadTeaches(+params['id']));
            _this.store.dispatch(_this.userActions.loadAvailableStudents(+params['id'], 1, ""));
            _this.store.dispatch(_this.teacherActions.loadAvailableTeachers(+params['id'], 1, ""));
        });
    };
    GroupDetailComponent.prototype.deleteGroup = function (group) {
        this.store.dispatch(this.groupActions.deleteGroup(group.id));
    };
    GroupDetailComponent.prototype.groupUpdate = function (group) {
        this.store.dispatch(this.groupActions.saveGroup(group));
    };
    GroupDetailComponent.prototype.loadUsers = function ($event) {
        this.store.dispatch(this.userActions.loadAvailableStudents($event.group, $event.page, $event.filter));
    };
    GroupDetailComponent.prototype.showUserDetails = function (id) {
        this.store.dispatch(this.routerActions.go(['userdetail', id]));
    };
    GroupDetailComponent.prototype.addStudentToGroup = function ($event) {
        this.store.dispatch(this.groupActions.addGroupStudent($event.groupId, $event.userId));
    };
    GroupDetailComponent.prototype.removeGroupStudent = function ($event) {
        this.store.dispatch(this.groupActions.removeStudent($event.groupId, $event.studentId));
    };
    GroupDetailComponent.prototype.loadTeachers = function ($event) {
        this.store.dispatch(this.teacherActions.loadAvailableTeachers($event.group, $event.page, $event.filter));
    };
    GroupDetailComponent.prototype.showTeacherDetails = function (id) {
        this.store.dispatch(this.routerActions.go(['teacherdetail', id]));
    };
    GroupDetailComponent.prototype.addTeacherToGroup = function ($event) {
        this.store.dispatch(this.groupActions.addGroupTeacher($event.groupId, $event.teacher));
    };
    GroupDetailComponent.prototype.removeGroupTeacher = function ($event) {
        this.store.dispatch(this.groupActions.removeTeacher($event.groupId, $event.teacherId));
    };
    GroupDetailComponent.prototype.goBack = function () {
        this.store.dispatch(this.routerActions.back());
        this.store.dispatch(this.errorActions.removeError());
    };
    return GroupDetailComponent;
}());
GroupDetailComponent = __decorate([
    core_1.Component({
        selector: 'group-detail',
        template: "\n<div  class=\"col-sm-6\">\n    <button (click)=\"goBack()\" class=\"btn btn-default\">Back</button>\n    <group-detail-form [errors] = \"errors$ | async\"\n                       [model] = \"model$ | async\"\n                       [allUsers] = \"allStudents$ | async\"\n                       [allTeachers] = \"allTeachers$ | async\"\n                       (deleteGroup) = \"deleteGroup($event)\"\n                       (updateGroup) = \"groupUpdate($event)\"\n                       (groupGoBack) = \"goBack()\"\n                       (loadStudents) = \"loadUsers($event)\"\n                       (showUserDetails) = showUserDetails($event)\n                       (addGroupStudent) = addStudentToGroup($event)\n                       (removeGroupStudent) = removeGroupStudent($event)\n                       (loadTeachers) = \"loadTeachers($event)\"\n                       (showGroupTeacherDetails) = showTeacherDetails($event)\n                       (addGroupTeacher) = addTeacherToGroup($event)\n                       (removeGroupTeacher) = removeGroupTeacher($event)>\n    </group-detail-form>\n</div>"
    }),
    __metadata("design:paramtypes", [store_1.Store,
        group_actions_1.GroupActions,
        user_actions_1.UserActions,
        teacher_actions_1.TeacherActions,
        router_actions_1.RouterActions,
        router_1.ActivatedRoute,
        error_actions_1.ErrorActions])
], GroupDetailComponent);
exports.GroupDetailComponent = GroupDetailComponent;
//# sourceMappingURL=group-detail.component.js.map