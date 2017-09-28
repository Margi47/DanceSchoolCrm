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
var teacher_actions_1 = require("../actions/teacher.actions");
var group_actions_1 = require("../actions/group.actions");
var error_actions_1 = require("../actions/error.actions");
var router_actions_1 = require("../actions/router.actions");
var teacher_service_1 = require("../services/teacher.service");
var TeacherEffects = (function () {
    function TeacherEffects(update$, teacherActions, groupActions, service, errorActions, routerActions) {
        var _this = this;
        this.update$ = update$;
        this.teacherActions = teacherActions;
        this.groupActions = groupActions;
        this.service = service;
        this.errorActions = errorActions;
        this.routerActions = routerActions;
        this.loadTeachersWithGroups$ = this.update$
            .ofType(teacher_actions_1.TeacherActions.LOAD_ALL_TEACHERS)
            .map(function (action) { return action.payload; })
            .switchMap(function (data) { return _this.service.getTeachers(data.page, data.filter)
            .map(function (teachers) { return _this.teacherActions.loadAllTeachersSuccess(teachers.data, teachers.total); })
            .catch(function (error) { return Observable_1.Observable.of(_this.errorActions.catchError(error.status, JSON.parse(error._body))); }); });
        this.getTeacher$ = this.update$
            .ofType(teacher_actions_1.TeacherActions.GET_TEACHER)
            .map(function (action) { return action.payload; })
            .switchMap(function (id) { return _this.service.getTeacher(id)
            .map(function (teacher) { return _this.teacherActions.getTeacherSuccess(teacher); })
            .catch(function (error) { return Observable_1.Observable.of(_this.errorActions.catchError(error.status, JSON.parse(error._body))); }); });
        this.loadAvailableTeachers$ = this.update$
            .ofType(teacher_actions_1.TeacherActions.LOAD_AVAILABLE_TEACHERS)
            .map(function (action) { return action.payload; })
            .switchMap(function (data) { return _this.service.getAvailableTeachers(data.groupId, data.page, data.filter)
            .map(function (teachers) { return _this.teacherActions.loadAvailableTeachersSuccess(teachers.data, teachers.total); })
            .catch(function (error) { return Observable_1.Observable.of(_this.errorActions.catchError(error.status, JSON.parse(error._body))); }); });
        this.addTeacher$ = this.update$
            .ofType(teacher_actions_1.TeacherActions.ADD_TEACHER)
            .map(function (action) { return action.payload; })
            .switchMap(function (teacher) { return _this.service.addTeacher(teacher)
            .map(function (teacherId) { return _this.routerActions.go(['teacherdetail', teacherId]); })
            .catch(function (error) { return Observable_1.Observable.of(_this.errorActions.catchError(error.status, JSON.parse(error._body))); }); });
        this.deleteTeacher$ = this.update$
            .ofType(teacher_actions_1.TeacherActions.DELETE_TEACHER)
            .map(function (action) { return action.payload; })
            .switchMap(function (teacher) { return _this.service.deleteTeacher(teacher)
            .map(function () { return _this.teacherActions.changeTeacherSuccess(); })
            .catch(function (error) { return Observable_1.Observable.of(_this.errorActions.catchError(error.status, JSON.parse(error._body))); }); });
        this.navigationAfterChange$ = this.update$
            .ofType(teacher_actions_1.TeacherActions.CHANGE_TEACHER_SUCCESS)
            .map(function () { return _this.routerActions.back(); });
        this.changeUserSuccess$ = this.update$
            .ofType(teacher_actions_1.TeacherActions.CHANGE_TEACHER_SUCCESS)
            .map(function () { return _this.errorActions.removeError(); });
        this.getTeacherGroups$ = this.update$
            .ofType(teacher_actions_1.TeacherActions.GET_TEACHER_GROUPS)
            .map(function (action) { return action.payload; })
            .switchMap(function (teacher) { return _this.service.getTeacherGroups(teacher)
            .map(function (groups) { return _this.teacherActions.getTeacherGroupsSuccess(groups); })
            .catch(function (error) { return Observable_1.Observable.of(_this.errorActions.catchError(error.status, JSON.parse(error._body))); }); });
        this.addTeacherGroup$ = this.update$
            .ofType(teacher_actions_1.TeacherActions.ADD_TEACHER_GROUP)
            .map(function (action) { return action.payload; })
            .switchMap(function (obj) { return _this.service.addGroup(obj.teacherId, obj.groupId)
            .map(function (teacher) { return _this.teacherActions.changeTeacherGroupsSuccess(teacher); })
            .catch(function (error) { return Observable_1.Observable.of(_this.errorActions.catchError(error.status, JSON.parse(error._body))); }); });
        this.removeTeacherGroup$ = this.update$
            .ofType(teacher_actions_1.TeacherActions.REMOVE_TEACHER_GROUP)
            .map(function (action) { return action.payload; })
            .switchMap(function (obj) { return _this.service.deleteGroup(obj.groupId, obj.teacherId)
            .map(function (teacher) { return _this.teacherActions.changeTeacherGroupsSuccess(teacher); })
            .catch(function (error) { return Observable_1.Observable.of(_this.errorActions.catchError(error.status, JSON.parse(error._body))); }); });
        this.getChangedGroups$ = this.update$
            .ofType(teacher_actions_1.TeacherActions.CHANGE_TEACHER_GROUPS_SUCCESS)
            .map(function (action) { return _this.teacherActions.getTeacherGroups(action.payload); });
        this.updateAvailableGroups$ = this.update$
            .ofType(teacher_actions_1.TeacherActions.CHANGE_TEACHER_GROUPS_SUCCESS)
            .map(function (action) { return _this.groupActions.loadAvailableTeacherGroups(action.payload, 1, ""); });
        this.removeError = this.update$
            .ofType(teacher_actions_1.TeacherActions.LOAD_ALL_TEACHERS_SUCCESS, teacher_actions_1.TeacherActions.GET_TEACHER_SUCCESS, teacher_actions_1.TeacherActions.LOAD_AVAILABLE_TEACHERS_SUCCESS, teacher_actions_1.TeacherActions.GET_TEACHER_GROUPS_SUCCESS, teacher_actions_1.TeacherActions.CHANGE_TEACHER_GROUPS_SUCCESS)
            .map(function (users) { return _this.errorActions.removeError(); });
    }
    return TeacherEffects;
}());
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], TeacherEffects.prototype, "loadTeachersWithGroups$", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], TeacherEffects.prototype, "getTeacher$", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], TeacherEffects.prototype, "loadAvailableTeachers$", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], TeacherEffects.prototype, "addTeacher$", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], TeacherEffects.prototype, "deleteTeacher$", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], TeacherEffects.prototype, "navigationAfterChange$", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], TeacherEffects.prototype, "changeUserSuccess$", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], TeacherEffects.prototype, "getTeacherGroups$", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], TeacherEffects.prototype, "addTeacherGroup$", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], TeacherEffects.prototype, "removeTeacherGroup$", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], TeacherEffects.prototype, "getChangedGroups$", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], TeacherEffects.prototype, "updateAvailableGroups$", void 0);
__decorate([
    effects_1.Effect(),
    __metadata("design:type", Object)
], TeacherEffects.prototype, "removeError", void 0);
TeacherEffects = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [effects_1.Actions,
        teacher_actions_1.TeacherActions,
        group_actions_1.GroupActions,
        teacher_service_1.TeacherService,
        error_actions_1.ErrorActions,
        router_actions_1.RouterActions])
], TeacherEffects);
exports.TeacherEffects = TeacherEffects;
//# sourceMappingURL=teacher.effects.js.map