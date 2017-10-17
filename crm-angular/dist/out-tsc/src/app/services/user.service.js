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
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
require("rxjs/add/operator/mergeMap");
require("rxjs/add/observable/forkJoin");
var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.usersUrl = environment_1.environment.url + '/api/users';
        this.groupUserUrl = environment_1.environment.url + '/api/groupuser';
    }
    UserService.prototype.getUsers = function (page, filter) {
        return this.http.get(this.usersUrl + "?filter=" + filter + "&page=" + page + "&pagesize=10")
            .map(function (response) {
            var data = response.json();
            data.filter = filter;
            return data;
        });
    };
    UserService.prototype.getUser = function (id) {
        return this.http.get(this.usersUrl + "/" + id)
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.getUserGroups = function (userId) {
        return this.http.get(this.groupUserUrl + "/" + userId + "/groups")
            .map(function (response) { return response.json(); });
    };
    UserService.prototype.getAvailableStudents = function (groupId, page, filter) {
        return this.http.get(this.groupUserUrl + "/" + groupId + "/students/available?filter=" + filter + "&page=" + page + "&pagesize=10")
            .map(function (response) {
            var data = response.json();
            data.filter = filter;
            return data;
        });
    };
    UserService.prototype.getAvailableTeachers = function (page, filter) {
        return this.http.get(this.usersUrl + "/teachers/available?filter=" + filter + "&page=" + page + "&pagesize=10")
            .map(function (response) {
            var data = response.json();
            data.filter = filter;
            return data;
        });
    };
    UserService.prototype.addUser = function (user) {
        var _this = this;
        var body = JSON.stringify(user);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.usersUrl, body, options)
            .map(function (response) { return response.json(); })
            .mergeMap(function (user) {
            if (user.isTeacher) {
                return _this.createTeacher(user).map(function (x) { return user.id; });
            }
            return Observable_1.Observable.of(user.id);
        });
    };
    UserService.prototype.deleteUser = function (userId) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.delete(this.usersUrl + "/" + userId, options)
            .map(function (response) { return null; });
    };
    UserService.prototype.update = function (userData) {
        var body = JSON.stringify(userData);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put(this.usersUrl + "/" + userData.id, body, options)
            .map(function (response) { return null; });
    };
    UserService.prototype.addGroup = function (userId, groupId) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.groupUserUrl + "/" + userId + "/" + groupId, options)
            .map(function (response) { return userId; });
    };
    UserService.prototype.removeGroup = function (userId, groupId) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.delete(this.groupUserUrl + "/" + userId + "/" + groupId, options)
            .map(function (response) { return userId; });
    };
    UserService.prototype.createTeacher = function (userData) {
        var teacher = { id: userData.id, name: userData.name, groups: [], styles: [] };
        var body = JSON.stringify(teacher);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post('api/teachers', body, options)
            .map(function (response) { return userData.id; });
    };
    UserService.prototype.deleteTeacher = function (userId) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var teacherUrl = 'api/teachers';
        return this.http.delete(teacherUrl + "/" + userId, options)
            .map(function (response) { return userId; });
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map