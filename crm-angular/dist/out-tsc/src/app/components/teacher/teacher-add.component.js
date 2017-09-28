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
var group_actions_1 = require("../../actions/group.actions");
var teacher_actions_1 = require("../../actions/teacher.actions");
var router_actions_1 = require("../../actions/router.actions");
var TeacherAddComponent = (function () {
    function TeacherAddComponent(routerActions, store, userActions, groupActions, teacherActions) {
        this.routerActions = routerActions;
        this.store = store;
        this.userActions = userActions;
        this.groupActions = groupActions;
        this.teacherActions = teacherActions;
        this.users$ = this.store.select('users');
    }
    TeacherAddComponent.prototype.ngOnInit = function () {
        this.store.dispatch(this.userActions.loadAvailableTeachers(1, ""));
    };
    TeacherAddComponent.prototype.loadNextPage = function ($event) {
        this.store.dispatch(this.userActions.loadAvailableTeachers($event.page, $event.filter));
    };
    TeacherAddComponent.prototype.onTeacherSubmit = function (teacher) {
        this.store.dispatch(this.teacherActions.addTeacher(teacher));
    };
    TeacherAddComponent.prototype.onTeacherCancel = function () {
        this.store.dispatch(this.routerActions.go(['/teachers']));
    };
    return TeacherAddComponent;
}());
TeacherAddComponent = __decorate([
    core_1.Component({
        selector: 'add-teacher',
        template: "\n<div class=\"col-sm-6\">\n    <teacher-add-form \n            [allUsers]=\"users$ | async\"\n            (loadUsers)=\"loadNextPage($event)\"\n            (teacherSave)=\"onTeacherSubmit($event)\" \n            (teacherCancel)=\"onTeacherCancel()\">\n    </teacher-add-form>\n</div>\n"
    }),
    __metadata("design:paramtypes", [router_actions_1.RouterActions,
        store_1.Store,
        user_actions_1.UserActions,
        group_actions_1.GroupActions,
        teacher_actions_1.TeacherActions])
], TeacherAddComponent);
exports.TeacherAddComponent = TeacherAddComponent;
//# sourceMappingURL=teacher-add.component.js.map