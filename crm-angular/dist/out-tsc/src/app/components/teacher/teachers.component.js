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
var router_1 = require("@angular/router");
var store_1 = require("@ngrx/store");
var teacher_actions_1 = require("../../actions/teacher.actions");
var TeachersComponent = (function () {
    function TeachersComponent(router, store, teacherActions) {
        this.router = router;
        this.store = store;
        this.teacherActions = teacherActions;
        this.teachers$ = store.select('teachers');
    }
    TeachersComponent.prototype.ngOnInit = function () {
        this.store.dispatch(this.teacherActions.loadAllTeachers(1));
    };
    ;
    TeachersComponent.prototype.addTeacher = function () {
        this.router.navigate(['/teacheradd']);
    };
    TeachersComponent.prototype.showTeacherDetails = function (id) {
        this.router.navigate(['teacherdetail', id]);
    };
    TeachersComponent.prototype.showUserDetails = function (id) {
        this.router.navigate(['userdetail', id]);
    };
    TeachersComponent.prototype.onPageChanged = function (page) {
        this.store.dispatch(this.teacherActions.loadAllTeachers(page));
    };
    return TeachersComponent;
}());
TeachersComponent = __decorate([
    core_1.Component({
        selector: 'teachers',
        template: "\n<teachers-list [teachers] = \"teachers$ | async\" \n              (add)=\"addTeacher()\" \n              (teacherDetails)=\"showTeacherDetails($event)\"\n              (userDetails)=\"showUserDetails($event)\"\n              (pageChanged)=\"onPageChanged($event)\">\n</teachers-list>\n"
    }),
    __metadata("design:paramtypes", [router_1.Router,
        store_1.Store,
        teacher_actions_1.TeacherActions])
], TeachersComponent);
exports.TeachersComponent = TeachersComponent;
//# sourceMappingURL=teachers.component.js.map