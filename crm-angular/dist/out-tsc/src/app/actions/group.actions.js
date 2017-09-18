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
var GroupActions = GroupActions_1 = (function () {
    function GroupActions() {
    }
    GroupActions.prototype.loadGroups = function (page) {
        return {
            type: GroupActions_1.LOAD_GROUPS,
            payload: page
        };
    };
    GroupActions.prototype.loadGroupsSuccess = function (groups, total) {
        return {
            type: GroupActions_1.LOAD_GROUPS_SUCCESS,
            payload: new actionWithPayload_1.GroupList(groups, total)
        };
    };
    GroupActions.prototype.getGroup = function (groupId) {
        return {
            type: GroupActions_1.GET_GROUP,
            payload: groupId
        };
    };
    GroupActions.prototype.getGroupSuccess = function (group) {
        return {
            type: GroupActions_1.GET_GROUP_SUCCESS,
            payload: group
        };
    };
    GroupActions.prototype.loadAvailableUserGroups = function (userId, page) {
        return {
            type: GroupActions_1.LOAD_AVAILABLE_USER_GROUPS,
            payload: new actionWithPayload_2.AvailableGroups(userId, page)
        };
    };
    GroupActions.prototype.loadAvailableUserGroupsSuccess = function (groups, total) {
        return {
            type: GroupActions_1.LOAD_AVAILABLE_USER_GROUPS_SUCCESS,
            payload: new actionWithPayload_1.GroupList(groups, total)
        };
    };
    GroupActions.prototype.loadAvailableTeacherGroups = function (teacherId, page) {
        return {
            type: GroupActions_1.LOAD_AVAILABLE_TEACHER_GROUPS,
            payload: new actionWithPayload_2.AvailableGroups(teacherId, page)
        };
    };
    GroupActions.prototype.loadAvailableTeacherGroupsSuccess = function (groups, total) {
        return {
            type: GroupActions_1.LOAD_AVAILABLE_TEACHER_GROUPS_SUCCESS,
            payload: new actionWithPayload_1.GroupList(groups, total)
        };
    };
    GroupActions.prototype.saveGroup = function (group) {
        return {
            type: GroupActions_1.SAVE_GROUP,
            payload: group
        };
    };
    GroupActions.prototype.changeGroupSuccess = function () {
        return {
            type: GroupActions_1.CHANGE_GROUP_SUCCESS,
            payload: null
        };
    };
    GroupActions.prototype.addGroup = function (group) {
        return {
            type: GroupActions_1.ADD_GROUP,
            payload: group
        };
    };
    GroupActions.prototype.addGroupSuccess = function (groupId) {
        return {
            type: GroupActions_1.ADD_GROUP_SUCCESS,
            payload: groupId
        };
    };
    GroupActions.prototype.deleteGroup = function (groupId) {
        return {
            type: GroupActions_1.DELETE_GROUP,
            payload: groupId
        };
    };
    GroupActions.prototype.loadStudents = function (groupId) {
        return {
            type: GroupActions_1.LOAD_STUDENTS,
            payload: groupId
        };
    };
    GroupActions.prototype.loadStudentsSuccess = function (users) {
        return {
            type: GroupActions_1.LOAD_STUDENTS_SUCCESS,
            payload: users
        };
    };
    GroupActions.prototype.addGroupStudent = function (groupId, userId) {
        console.log(userId + "from action");
        return {
            type: GroupActions_1.ADD_STUDENT,
            payload: new actionWithPayload_3.UserGroup(groupId, userId)
        };
    };
    GroupActions.prototype.removeStudent = function (groupId, userId) {
        return {
            type: GroupActions_1.REMOVE_STUDENT,
            payload: new actionWithPayload_3.UserGroup(groupId, userId)
        };
    };
    GroupActions.prototype.changeGroupStudentsSuccess = function (groupId) {
        return {
            type: GroupActions_1.CHANGE_GROUP_STUDENTS_SUCCESS,
            payload: groupId
        };
    };
    GroupActions.prototype.loadTeaches = function (groupId) {
        return {
            type: GroupActions_1.LOAD_TEACHERS,
            payload: groupId
        };
    };
    GroupActions.prototype.loadTeachesSuccess = function (teachers) {
        return {
            type: GroupActions_1.LOAD_TEACHERS_SUCCESS,
            payload: teachers
        };
    };
    GroupActions.prototype.addGroupTeacher = function (groupId, teacherId) {
        return {
            type: GroupActions_1.ADD_TEACHER,
            payload: new actionWithPayload_4.GroupTeacher(groupId, teacherId)
        };
    };
    GroupActions.prototype.removeTeacher = function (groupId, teacherId) {
        return {
            type: GroupActions_1.REMOVE_TEACHER,
            payload: new actionWithPayload_4.GroupTeacher(groupId, teacherId)
        };
    };
    GroupActions.prototype.changeGroupTeachersSuccess = function (groupId) {
        return {
            type: GroupActions_1.CHANGE_GROUP_TEACHERS_SUCCESS,
            payload: groupId
        };
    };
    return GroupActions;
}());
GroupActions.LOAD_GROUPS = '[Group] Load Groups';
GroupActions.LOAD_GROUPS_SUCCESS = '[Group] Load Groups Success';
GroupActions.GET_GROUP = '[Group] Get Group';
GroupActions.GET_GROUP_SUCCESS = '[Group] Get Group Success';
GroupActions.LOAD_AVAILABLE_USER_GROUPS = '[Group] Load Available User Groups';
GroupActions.LOAD_AVAILABLE_USER_GROUPS_SUCCESS = '[Group] Load Available User Groups Success';
GroupActions.LOAD_AVAILABLE_TEACHER_GROUPS = '[Group] Load Available Teacher Groups';
GroupActions.LOAD_AVAILABLE_TEACHER_GROUPS_SUCCESS = '[Group] Load Available Teacher Groups Success';
GroupActions.SAVE_GROUP = '[Group] Save Group';
GroupActions.CHANGE_GROUP_SUCCESS = '[Group] Change Group Success';
GroupActions.ADD_GROUP = '[Group] Add Group';
GroupActions.ADD_GROUP_SUCCESS = '[Group] Add Group Success';
GroupActions.DELETE_GROUP = '[Group] Delete Group';
GroupActions.LOAD_STUDENTS = '[Group] Load Group Students';
GroupActions.LOAD_STUDENTS_SUCCESS = '[Group] Load Group Students Success';
GroupActions.ADD_STUDENT = '[Group] Add Group Student';
GroupActions.REMOVE_STUDENT = '[Group] Remove Student';
GroupActions.CHANGE_GROUP_STUDENTS_SUCCESS = '[Group] Change Group Students Success';
GroupActions.LOAD_TEACHERS = '[Group] Load Group Teachers';
GroupActions.LOAD_TEACHERS_SUCCESS = '[Group] Load Group Teachers Success';
GroupActions.ADD_TEACHER = '[Group] Add Group Teacher';
GroupActions.REMOVE_TEACHER = '[Group] Remove Teacher';
GroupActions.CHANGE_GROUP_TEACHERS_SUCCESS = '[Group] Change Group Teachers Success';
GroupActions = GroupActions_1 = __decorate([
    core_1.Injectable()
], GroupActions);
exports.GroupActions = GroupActions;
var GroupActions_1;
//# sourceMappingURL=group.actions.js.map