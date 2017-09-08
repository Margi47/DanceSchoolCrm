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
var router_2 = require("@angular/router");
var store_1 = require("@ngrx/store");
;
var teacher_actions_1 = require("../../actions/teacher.actions");
var group_actions_1 = require("../../actions/group.actions");
var common_1 = require("@angular/common");
var TeacherDetailComponent = (function () {
    function TeacherDetailComponent(router, route, store, teacherActions, groupActions, location) {
        this.router = router;
        this.route = route;
        this.store = store;
        this.teacherActions = teacherActions;
        this.groupActions = groupActions;
        this.location = location;
        this.model$ = this.store.select('teacher');
        this.allGroups$ = this.store.select('groups');
    }
    TeacherDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.store.dispatch(_this.teacherActions.getTeacher(+params['id']));
            _this.store.dispatch(_this.teacherActions.getTeacherGroups(+params['id']));
            _this.store.dispatch(_this.groupActions.loadAvailableTeacherGroups(+params['id'], 1));
        });
    };
    TeacherDetailComponent.prototype.loadNextGroups = function ($event) {
        this.store.dispatch(this.groupActions.loadAvailableTeacherGroups($event.teacher, $event.page));
    };
    TeacherDetailComponent.prototype.onShowGroupDetails = function (id) {
        this.router.navigate(['groupdetail', id]);
    };
    TeacherDetailComponent.prototype.onShowUserInfo = function (id) {
        this.router.navigate(['userdetail', id]);
    };
    TeacherDetailComponent.prototype.onTeacherDelete = function (teacher) {
        this.store.dispatch(this.teacherActions.deleteTeacher(teacher.id));
        this.goBack();
    };
    TeacherDetailComponent.prototype.onAddGroup = function ($event) {
        this.store.dispatch(this.teacherActions.addTeacherGroup($event.teacher, $event.group));
    };
    TeacherDetailComponent.prototype.onRemoveGroup = function ($event) {
        this.store.dispatch(this.teacherActions.removeTeacherGroup($event.group, $event.teacher));
    };
    TeacherDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    return TeacherDetailComponent;
}());
TeacherDetailComponent = __decorate([
    core_1.Component({
        selector: 'teacher-detail',
        template: "<div class=\"col-sm-6\">\n                    <button (click)=\"goBack()\" class=\"btn btn-default\" type = \"button\">Back</button>\n                    <teacher-detail-form [model] = \"model$ | async\" \n                                         [allGroups] = \"allGroups$ | async\"\n                                         (loadNextPage) = \"loadNextGroups($event)\"\n                                         (showGroupDetails) = \"onShowGroupDetails($event)\"\n                                         (showUser) = \"onShowUserInfo($event)\"\n                                         (teacherDelete)=\"onTeacherDelete($event)\"\n                                         (addGroup) = \"onAddGroup($event)\"\n                                         (removeGroup) = \"onRemoveGroup($event)\">\n                    </teacher-detail-form>\n               <div>\n               "
    }),
    __metadata("design:paramtypes", [router_2.Router,
        router_1.ActivatedRoute,
        store_1.Store,
        teacher_actions_1.TeacherActions,
        group_actions_1.GroupActions,
        common_1.Location])
], TeacherDetailComponent);
exports.TeacherDetailComponent = TeacherDetailComponent;
//# sourceMappingURL=teacher-detail.component.js.map