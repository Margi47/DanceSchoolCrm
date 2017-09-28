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
var actionWithPayload_2 = require("../actions/actionWithPayload");
var actionWithPayload_3 = require("../actions/actionWithPayload");
var actionWithPayload_4 = require("../actions/actionWithPayload");
var TeacherActions = TeacherActions_1 = (function () {
    function TeacherActions() {
    }
    TeacherActions.prototype.loadAllTeachers = function (page, filter) {
        return {
            type: TeacherActions_1.LOAD_ALL_TEACHERS,
            payload: new actionWithPayload_4.ListRequest(page, filter)
        };
    };
    TeacherActions.prototype.loadAllTeachersSuccess = function (teachers, total) {
        return {
            type: TeacherActions_1.LOAD_ALL_TEACHERS_SUCCESS,
            payload: new actionWithPayload_1.TeacherList(teachers, total)
        };
    };
    TeacherActions.prototype.loadAvailableTeachers = function (groupId, page, filter) {
        return {
            type: TeacherActions_1.LOAD_AVAILABLE_TEACHERS,
            payload: new actionWithPayload_2.AvailableGroupTeachers(groupId, page, filter)
        };
    };
    TeacherActions.prototype.loadAvailableTeachersSuccess = function (teachers, total) {
        return {
            type: TeacherActions_1.LOAD_AVAILABLE_TEACHERS_SUCCESS,
            payload: new actionWithPayload_1.TeacherList(teachers, total)
        };
    };
    TeacherActions.prototype.getTeacher = function (id) {
        return {
            type: TeacherActions_1.GET_TEACHER,
            payload: id
        };
    };
    TeacherActions.prototype.getTeacherSuccess = function (teacher) {
        return {
            type: TeacherActions_1.GET_TEACHER_SUCCESS,
            payload: teacher
        };
    };
    TeacherActions.prototype.addTeacher = function (teacher) {
        return {
            type: TeacherActions_1.ADD_TEACHER,
            payload: teacher
        };
    };
    TeacherActions.prototype.deleteTeacher = function (teacherId) {
        return {
            type: TeacherActions_1.DELETE_TEACHER,
            payload: teacherId
        };
    };
    TeacherActions.prototype.changeTeacherSuccess = function () {
        return {
            type: TeacherActions_1.CHANGE_TEACHER_SUCCESS,
            payload: null
        };
    };
    TeacherActions.prototype.getTeacherGroups = function (teacherId) {
        return {
            type: TeacherActions_1.GET_TEACHER_GROUPS,
            payload: teacherId
        };
    };
    TeacherActions.prototype.getTeacherGroupsSuccess = function (groups) {
        return {
            type: TeacherActions_1.GET_TEACHER_GROUPS_SUCCESS,
            payload: groups
        };
    };
    TeacherActions.prototype.addTeacherGroup = function (teacherId, groupId) {
        return {
            type: TeacherActions_1.ADD_TEACHER_GROUP,
            payload: new actionWithPayload_3.GroupTeacher(groupId, teacherId)
        };
    };
    TeacherActions.prototype.removeTeacherGroup = function (groupId, teacherId) {
        return {
            type: TeacherActions_1.REMOVE_TEACHER_GROUP,
            payload: new actionWithPayload_3.GroupTeacher(groupId, teacherId)
        };
    };
    TeacherActions.prototype.changeTeacherGroupsSuccess = function (teacherId) {
        return {
            type: TeacherActions_1.CHANGE_TEACHER_GROUPS_SUCCESS,
            payload: teacherId
        };
    };
    return TeacherActions;
}());
TeacherActions.LOAD_ALL_TEACHERS = '[Teacher] Load All Teachers';
TeacherActions.LOAD_ALL_TEACHERS_SUCCESS = '[Teacher] Load All Teachers Success';
TeacherActions.LOAD_AVAILABLE_TEACHERS = '[Teacher] Load Available Teachers';
TeacherActions.LOAD_AVAILABLE_TEACHERS_SUCCESS = '[Teacher] Load Available Teachers Success';
TeacherActions.GET_TEACHER = '[Teacher] Get Teacher';
TeacherActions.GET_TEACHER_SUCCESS = '[Teacher] Get Teacher Success';
TeacherActions.ADD_TEACHER = '[Teacher] Add Teacher';
TeacherActions.DELETE_TEACHER = '[Teacher] Delete Teacher';
TeacherActions.CHANGE_TEACHER_SUCCESS = '[Teacher] Change Teacher Success';
TeacherActions.GET_TEACHER_GROUPS = '[Teacher] Get Teacher Groups';
TeacherActions.GET_TEACHER_GROUPS_SUCCESS = '[Teacher] Get Teacher Groups Success';
TeacherActions.ADD_TEACHER_GROUP = '[Teacher] Add Teacher Group';
TeacherActions.REMOVE_TEACHER_GROUP = '[Teacher] Remove Teacher Groups';
TeacherActions.CHANGE_TEACHER_GROUPS_SUCCESS = '[Teacher] Change Teacher Groups Success';
TeacherActions = TeacherActions_1 = __decorate([
    core_1.Injectable()
], TeacherActions);
exports.TeacherActions = TeacherActions;
var TeacherActions_1;
//# sourceMappingURL=teacher.actions.js.map