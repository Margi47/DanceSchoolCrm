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
var http_1 = require("@angular/http");
var environment_1 = require("../../environments/environment");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
var GroupService = (function () {
    function GroupService(http) {
        this.http = http;
        this.groupsUrl = environment_1.environment.url + '/api/groups';
        this.groupUserUrl = environment_1.environment.url + '/api/groupuser';
        this.groupTeacherUrl = environment_1.environment.url + '/api/groupteacher';
    }
    GroupService.prototype.getGroups = function (page, filter) {
        return this.http.get(this.groupsUrl + "?filter=" + filter + "&page=" + page + "&pagesize=10")
            .map(function (response) { return response.json(); });
    };
    GroupService.prototype.getGroup = function (id) {
        return this.http.get(this.groupsUrl + "/" + id)
            .map(function (response) { return response.json(); });
    };
    GroupService.prototype.getAvailableUserGroups = function (id, page, filter) {
        return this.http.get(this.groupUserUrl + "/" + id + "/groups/available?filter=" + filter + "&page=" + page + "&pagesize=10")
            .map(function (response) { return response.json(); });
    };
    GroupService.prototype.getAvailableTeacherGroups = function (id, page, filter) {
        return this.http.get(this.groupTeacherUrl + "/" + id + "/groups/available?filter=" + filter + "&page=" + page + "&pagesize=10")
            .map(function (response) { return response.json(); });
    };
    GroupService.prototype.addGroup = function (group) {
        var body = JSON.stringify(group);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.groupsUrl, body, options)
            .map(function (response) { return response.json().id; });
    };
    GroupService.prototype.deleteGroup = function (groupId) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.delete(this.groupsUrl + "/" + groupId, headers)
            .map(function (response) { return null; });
    };
    GroupService.prototype.update = function (groupData) {
        var body = JSON.stringify(groupData);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put(this.groupsUrl + "/" + groupData.id, body, options)
            .map(function (response) { return null; });
    };
    GroupService.prototype.getStudents = function (groupId) {
        return this.http.get(this.groupUserUrl + "/" + groupId + "/users")
            .map(function (response) { return response.json(); });
    };
    GroupService.prototype.addStudent = function (groupId, userId) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.groupUserUrl + "/" + userId + "/" + groupId, options)
            .map(function (response) { return groupId; });
    };
    GroupService.prototype.removeStudent = function (groupId, userId) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.delete(this.groupUserUrl + "/" + userId + "/" + groupId, headers)
            .map(function (response) { return groupId; });
    };
    GroupService.prototype.getTeachers = function (groupId) {
        return this.http.get(this.groupTeacherUrl + "/" + groupId + "/teachers")
            .map(function (response) { return response.json(); });
    };
    GroupService.prototype.addTeacher = function (groupId, teacherId) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.groupTeacherUrl + "/" + groupId + "/" + teacherId, options)
            .map(function (response) { return groupId; });
    };
    GroupService.prototype.removeTeacher = function (groupId, teacherId) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.delete(this.groupTeacherUrl + "/" + groupId + "/" + teacherId, headers)
            .map(function (response) { return groupId; });
    };
    return GroupService;
}());
GroupService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], GroupService);
exports.GroupService = GroupService;
//# sourceMappingURL=group.service.js.map