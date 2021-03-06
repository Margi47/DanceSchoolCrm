"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ListRequest = (function () {
    function ListRequest(page, filter) {
        this.page = page;
        this.filter = filter;
    }
    return ListRequest;
}());
exports.ListRequest = ListRequest;
var UserList = (function () {
    function UserList(userList, total, filter) {
        this.userList = userList;
        this.total = total;
        this.filter = filter;
    }
    return UserList;
}());
exports.UserList = UserList;
var GroupList = (function () {
    function GroupList(groupList, total, filter) {
        this.groupList = groupList;
        this.total = total;
        this.filter = filter;
    }
    return GroupList;
}());
exports.GroupList = GroupList;
var TeacherList = (function () {
    function TeacherList(teacherList, total, filter) {
        this.teacherList = teacherList;
        this.total = total;
        this.filter = filter;
    }
    return TeacherList;
}());
exports.TeacherList = TeacherList;
var AvailableGroupStudents = (function () {
    function AvailableGroupStudents(groupId, page, filter) {
        this.groupId = groupId;
        this.page = page;
        this.filter = filter;
    }
    return AvailableGroupStudents;
}());
exports.AvailableGroupStudents = AvailableGroupStudents;
var AvailableGroupTeachers = (function () {
    function AvailableGroupTeachers(groupId, page, filter) {
        this.groupId = groupId;
        this.page = page;
        this.filter = filter;
    }
    return AvailableGroupTeachers;
}());
exports.AvailableGroupTeachers = AvailableGroupTeachers;
var AvailableGroups = (function () {
    function AvailableGroups(userId, page, filter) {
        this.userId = userId;
        this.page = page;
        this.filter = filter;
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