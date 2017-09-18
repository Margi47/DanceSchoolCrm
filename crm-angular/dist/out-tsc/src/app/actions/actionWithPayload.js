"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserList = (function () {
    function UserList(userList, total) {
        this.userList = userList;
        this.total = total;
    }
    return UserList;
}());
exports.UserList = UserList;
var GroupList = (function () {
    function GroupList(groupList, total) {
        this.groupList = groupList;
        this.total = total;
    }
    return GroupList;
}());
exports.GroupList = GroupList;
var TeacherList = (function () {
    function TeacherList(teacherList, total) {
        this.teacherList = teacherList;
        this.total = total;
    }
    return TeacherList;
}());
exports.TeacherList = TeacherList;
var AvailableGroupStudents = (function () {
    function AvailableGroupStudents(groupId, page) {
        this.groupId = groupId;
        this.page = page;
    }
    return AvailableGroupStudents;
}());
exports.AvailableGroupStudents = AvailableGroupStudents;
var AvailableGroupTeachers = (function () {
    function AvailableGroupTeachers(groupId, page) {
        this.groupId = groupId;
        this.page = page;
    }
    return AvailableGroupTeachers;
}());
exports.AvailableGroupTeachers = AvailableGroupTeachers;
var AvailableGroups = (function () {
    function AvailableGroups(userId, page) {
        this.userId = userId;
        this.page = page;
    }
    return AvailableGroups;
}());
exports.AvailableGroups = AvailableGroups;
var UserGroup = (function () {
    function UserGroup(groupId, userId) {
        this.groupId = groupId;
        this.userId = userId;
    }
    return UserGroup;
}());
exports.UserGroup = UserGroup;
var GroupTeacher = (function () {
    function GroupTeacher(groupId, teacherId) {
        this.groupId = groupId;
        this.teacherId = teacherId;
    }
    return GroupTeacher;
}());
exports.GroupTeacher = GroupTeacher;
var ErrorPayload = (function () {
    function ErrorPayload(code, error) {
        this.code = code;
        this.error = error;
    }
    return ErrorPayload;
}());
exports.ErrorPayload = ErrorPayload;
var NavigationPayload = (function () {
    function NavigationPayload(path, query, extras) {
        this.path = path;
        this.query = query;
        this.extras = extras;
    }
    return NavigationPayload;
}());
exports.NavigationPayload = NavigationPayload;
//# sourceMappingURL=actionWithPayload.js.map