"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var users_component_1 = require("../user/users.component");
var user_detail_component_1 = require("../user/user-detail.component");
var user_add_component_1 = require("../user/user-add.component");
var groups_component_1 = require("../group/groups.component");
var group_detail_component_1 = require("../group/group-detail.component");
var group_add_component_1 = require("../group/group-add.component");
var teachers_component_1 = require("../teacher/teachers.component");
var teacher_detail_component_1 = require("../teacher/teacher-detail.component");
var teacher_add_component_1 = require("../teacher/teacher-add.component");
var routes = [
    { path: '', redirectTo: '/users', pathMatch: 'full' },
    { path: 'users', component: users_component_1.UsersComponent },
    { path: 'userdetail/:id', component: user_detail_component_1.UserDetailComponent },
    { path: 'useradd', component: user_add_component_1.UserAddComponent },
    { path: 'groups', component: groups_component_1.GroupsComponent },
    { path: 'groupdetail/:id', component: group_detail_component_1.GroupDetailComponent },
    { path: 'groupadd', component: group_add_component_1.GroupAddComponent },
    { path: 'teachers', component: teachers_component_1.TeachersComponent },
    { path: 'teacherdetail/:id', component: teacher_detail_component_1.TeacherDetailComponent },
    { path: 'teacheradd', component: teacher_add_component_1.TeacherAddComponent }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map