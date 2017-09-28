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
var group_1 = require("../../models/group");
var GroupDetailFormComponent = (function () {
    function GroupDetailFormComponent() {
        this.newGroup = false;
        this.deleteGroup = new core_1.EventEmitter();
        this.updateGroup = new core_1.EventEmitter();
        this.groupGoBack = new core_1.EventEmitter();
        this.loadStudents = new core_1.EventEmitter();
        this.showUserDetails = new core_1.EventEmitter();
        this.addGroupStudent = new core_1.EventEmitter();
        this.removeGroupStudent = new core_1.EventEmitter();
        this.loadTeachers = new core_1.EventEmitter();
        this.showGroupTeacherDetails = new core_1.EventEmitter();
        this.addGroupTeacher = new core_1.EventEmitter();
        this.removeGroupTeacher = new core_1.EventEmitter();
        this.addingStudent = false;
        this.addingTeacher = false;
    }
    GroupDetailFormComponent.prototype.ngOnChanges = function () {
        this.isLastUserPage = this.allUsers.total != this.allUsers.length;
        this.isLastTeacherPage = this.allTeachers.total != this.allTeachers.length;
    };
    GroupDetailFormComponent.prototype.onGroupDelete = function () { this.deleteGroup.emit(this.model); };
    GroupDetailFormComponent.prototype.onGroupSubmit = function () { this.updateGroup.emit(this.model); };
    GroupDetailFormComponent.prototype.goBack = function () { this.groupGoBack.emit(); };
    GroupDetailFormComponent.prototype.loadNextUsers = function (data) {
        this.loadStudents.emit({ group: this.model.id, page: data.page, filter: data.filter });
    };
    GroupDetailFormComponent.prototype.showStudentDetails = function (id) { this.showUserDetails.emit(id); };
    GroupDetailFormComponent.prototype.addStudent = function (data) {
        this.addGroupStudent.emit({ groupId: this.model.id, userId: data.id });
        this.addingStudent = false;
    };
    GroupDetailFormComponent.prototype.removeStudent = function (id) {
        this.removeGroupStudent.emit({ groupId: this.model.id, studentId: id });
    };
    GroupDetailFormComponent.prototype.loadNextTeachers = function (data) {
        this.loadTeachers.emit({ group: this.model.id, page: data.page, filter: data.filter });
    };
    GroupDetailFormComponent.prototype.showTeacherDetails = function (id) { this.showGroupTeacherDetails.emit(id); };
    GroupDetailFormComponent.prototype.onTeacherAdd = function (data) {
        this.addGroupTeacher.emit({ groupId: this.model.id, teacher: data.id });
        this.addingTeacher = false;
    };
    GroupDetailFormComponent.prototype.removeTeacher = function (id) {
        this.removeGroupTeacher.emit({ groupId: this.model.id, teacherId: id });
    };
    return GroupDetailFormComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], GroupDetailFormComponent.prototype, "errors", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", group_1.Group)
], GroupDetailFormComponent.prototype, "model", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], GroupDetailFormComponent.prototype, "allUsers", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], GroupDetailFormComponent.prototype, "allTeachers", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], GroupDetailFormComponent.prototype, "deleteGroup", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], GroupDetailFormComponent.prototype, "updateGroup", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], GroupDetailFormComponent.prototype, "groupGoBack", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], GroupDetailFormComponent.prototype, "loadStudents", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], GroupDetailFormComponent.prototype, "showUserDetails", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], GroupDetailFormComponent.prototype, "addGroupStudent", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], GroupDetailFormComponent.prototype, "removeGroupStudent", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], GroupDetailFormComponent.prototype, "loadTeachers", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], GroupDetailFormComponent.prototype, "showGroupTeacherDetails", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], GroupDetailFormComponent.prototype, "addGroupTeacher", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], GroupDetailFormComponent.prototype, "removeGroupTeacher", void 0);
GroupDetailFormComponent = __decorate([
    core_1.Component({
        selector: 'group-detail-form',
        templateUrl: './group-form.component.html'
    })
], GroupDetailFormComponent);
exports.GroupDetailFormComponent = GroupDetailFormComponent;
//# sourceMappingURL=group-detail-form.component.js.map