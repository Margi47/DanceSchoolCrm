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
var teacher_1 = require("../../models/teacher");
var TeacherAddFormComponent = (function () {
    function TeacherAddFormComponent() {
        this.model = new teacher_1.Teacher();
        this.loadUsers = new core_1.EventEmitter();
        this.teacherSave = new core_1.EventEmitter();
        this.teacherCancel = new core_1.EventEmitter();
    }
    TeacherAddFormComponent.prototype.ngOnChanges = function () {
        this.isLastPage = this.allUsers.total != this.allUsers.users.length;
        console.log(this.allUsers, this.isLastPage);
    };
    TeacherAddFormComponent.prototype.loadNextUsers = function (data) {
        this.loadUsers.emit({ page: data.page, filter: data.filter });
    };
    TeacherAddFormComponent.prototype.userSelected = function (data) {
        this.selectedUser = data;
    };
    TeacherAddFormComponent.prototype.onTeacherSave = function () {
        this.model.id = this.selectedUser.id;
        this.model.name = this.selectedUser.name;
        this.teacherSave.emit(this.model);
    };
    TeacherAddFormComponent.prototype.onTeacherCancel = function () { this.teacherCancel.emit(); };
    return TeacherAddFormComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TeacherAddFormComponent.prototype, "allUsers", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TeacherAddFormComponent.prototype, "loadUsers", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TeacherAddFormComponent.prototype, "teacherSave", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TeacherAddFormComponent.prototype, "teacherCancel", void 0);
TeacherAddFormComponent = __decorate([
    core_1.Component({
        selector: 'teacher-add-form',
        templateUrl: './teacher-add-form.component.html'
    })
], TeacherAddFormComponent);
exports.TeacherAddFormComponent = TeacherAddFormComponent;
//# sourceMappingURL=teacher-add-form.component.js.map