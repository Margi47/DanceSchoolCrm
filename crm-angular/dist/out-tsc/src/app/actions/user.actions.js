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
var UserActions = UserActions_1 = (function () {
    function UserActions() {
    }
    UserActions.prototype.loadUsers = function (page, filter) {
        return {
            type: UserActions_1.LOAD_USERS,
            payload: new actionWithPayload_4.ListRequest(page, filter)
        };
    };
    UserActions.prototype.loadUsersSuccess = function (users, total) {
        return {
            type: UserActions_1.LOAD_USERS_SUCCESS,
            payload: new actionWithPayload_1.UserList(users, total)
        };
    };
    UserActions.prototype.loadAvailableStudents = function (groupId, page, filter) {
        return {
            type: UserActions_1.LOAD_AVAILABLE_STUDENTS,
            payload: new actionWithPayload_3.AvailableGroupStudents(groupId, page, filter)
        };
    };
    UserActions.prototype.loadAvailableStudentsSuccess = function (students, total) {
        return {
            type: UserActions_1.LOAD_AVAILABLE_STUDENTS_SUCCESS,
            payload: new actionWithPayload_1.UserList(students, total)
        };
    };
    UserActions.prototype.loadAvailableTeachers = function (page, filter) {
        return {
            type: UserActions_1.LOAD_AVAILABLE_TEACHERS,
            payload: new actionWithPayload_4.ListRequest(page, filter)
        };
    };
    UserActions.prototype.loadAvailableTeachersSuccess = function (users, total) {
        return {
            type: UserActions_1.LOAD_AVAILABLE_TEACHERS_SUCCESS,
            payload: new actionWithPayload_1.UserList(users, total)
        };
    };
    UserActions.prototype.getUser = function (userId) {
        return {
            type: UserActions_1.GET_USER,
            payload: userId
        };
    };
    UserActions.prototype.getUserSuccess = function (user) {
        return {
            type: UserActions_1.GET_USER_SUCCESS,
            payload: user
        };
    };
    UserActions.prototype.saveUser = function (user) {
        return {
            type: UserActions_1.SAVE_USER,
            payload: user
        };
    };
    UserActions.prototype.changeUserSuccess = function () {
        return {
            type: UserActions_1.CHANGE_USER_SUCCESS,
            payload: null
        };
    };
    UserActions.prototype.addUser = function (user) {
        return {
            type: UserActions_1.ADD_USER,
            payload: user
        };
    };
    UserActions.prototype.addUserSuccess = function (userId) {
        return {
            type: UserActions_1.ADD_USER_SUCCESS,
            payload: userId
        };
    };
    UserActions.prototype.deleteUser = function (userId) {
        return {
            type: UserActions_1.DELETE_USER,
            payload: userId
        };
    };
    UserActions.prototype.loadUserGroups = function (userId) {
        return {
            type: UserActions_1.LOAD_USER_GROUPS,
            payload: userId
        };
    };
    UserActions.prototype.loadUserGroupsSuccess = function (groups) {
        return {
            type: UserActions_1.LOAD_USER_GROUPS_SUCCESS,
            payload: groups
        };
    };
    UserActions.prototype.addUserGroup = function (userId, groupId) {
        return {
            type: UserActions_1.ADD_USER_GROUP,
            payload: new actionWithPayload_2.UserGroup(groupId, userId)
        };
    };
    UserActions.prototype.changeUserGroupsSuccess = function (userId) {
        return {
            type: UserActions_1.CHANGE_USER_GROUPS_SUCCESS,
            payload: userId
        };
    };
    UserActions.prototype.removeUserGroup = function (userId, groupId) {
        return {
            type: UserActions_1.REMOVE_USER_GROUP,
            payload: new actionWithPayload_2.UserGroup(groupId, userId)
        };
    };
    UserActions.prototype.createTeacher = function (user) {
        return {
            type: UserActions_1.CREATE_TEACHER,
            payload: user
        };
    };
    UserActions.prototype.deleteTeacher = function (userId) {
        return {
            type: UserActions_1.DELETE_TEACHER,
            payload: userId
        };
    };
    return UserActions;
}());
UserActions.LOAD_USERS = '[User] Load Users';
UserActions.LOAD_USERS_SUCCESS = '[User] Load Users Success';
UserActions.LOAD_AVAILABLE_STUDENTS = '[User] Load Available Students';
UserActions.LOAD_AVAILABLE_STUDENTS_SUCCESS = '[User] Load Available Students Success';
UserActions.LOAD_AVAILABLE_TEACHERS = '[User] Load Available Teachers';
UserActions.LOAD_AVAILABLE_TEACHERS_SUCCESS = '[User] Load Available Teachers Success';
UserActions.GET_USER = '[User] Get User';
UserActions.GET_USER_SUCCESS = '[User] Get User Success';
UserActions.SAVE_USER = '[User] Save User';
UserActions.CHANGE_USER_SUCCESS = '[User] Change User Success';
UserActions.ADD_USER = '[User] Add User';
UserActions.ADD_USER_SUCCESS = '[User] Add User Success';
UserActions.DELETE_USER = '[User] Delete User';
UserActions.LOAD_USER_GROUPS = '[User] Load User Groups';
UserActions.LOAD_USER_GROUPS_SUCCESS = '[User] Load User Groups Success';
UserActions.ADD_USER_GROUP = '[User] Add User Group';
UserActions.CHANGE_USER_GROUPS_SUCCESS = '[User] Change User Groups Success';
UserActions.REMOVE_USER_GROUP = '[User] Remove User Group';
UserActions.CREATE_TEACHER = '[User] Create Teacher';
UserActions.DELETE_TEACHER = '[User] Delete Teacher';
UserActions = UserActions_1 = __decorate([
    core_1.Injectable()
], UserActions);
exports.UserActions = UserActions;
var UserActions_1;
//# sourceMappingURL=user.actions.js.map