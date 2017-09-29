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
var TeacherService = (function () {
    function TeacherService(http) {
        this.http = http;
        this.teachersUrl = environment_1.environment.url + '/api/teachers';
        this.groupTeacherUrl = environment_1.environment.url + '/api/groupteacher';
    }
    TeacherService.prototype.getTeachers = function (page, filter) {
        return this.http.get(this.teachersUrl + "?filter=" + filter + "&page=" + page + "&pagesize=10")
            .map(function (response) {
            var data = response.json();
            data.filter = filter;
            return data;
        });
    };
    TeacherService.prototype.getAvailableTeachers = function (groupId, page, filter) {
        return this.http.get(this.groupTeacherUrl + "/" + groupId + "/teachers/available?filter=" + filter + "&page=" + page + "&pagesize=10")
            .map(function (response) {
            var data = response.json();
            data.filter = filter;
            return data;
        });
    };
    TeacherService.prototype.getTeacher = function (id) {
        return this.http.get(this.teachersUrl + "/" + id)
            .map(function (response) { return response.json(); });
    };
    TeacherService.prototype.addTeacher = function (teacher) {
        var body = JSON.stringify({ id: teacher.id, name: teacher.name });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.teachersUrl, body, options)
            .map(function (response) { return teacher.id; });
    };
    TeacherService.prototype.deleteTeacher = function (teacherId) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.delete(this.teachersUrl + "/" + teacherId, headers)
            .map(function (response) { return null; });
    };
    TeacherService.prototype.getTeacherGroups = function (teacherId) {
        return this.http.get(this.groupTeacherUrl + "/" + teacherId + "/groups")
            .map(function (response) { return response.json(); });
    };
    TeacherService.prototype.addGroup = function (teacherId, groupId) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.groupTeacherUrl + "/" + groupId + "/" + teacherId, options)
            .map(function (response) { return teacherId; });
    };
    TeacherService.prototype.deleteGroup = function (groupId, teacherId) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.delete(this.groupTeacherUrl + "/" + groupId + "/" + teacherId, headers)
            .map(function (response) { return teacherId; });
    };
    return TeacherService;
}());
TeacherService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], TeacherService);
exports.TeacherService = TeacherService;
//# sourceMappingURL=teacher.service.js.map