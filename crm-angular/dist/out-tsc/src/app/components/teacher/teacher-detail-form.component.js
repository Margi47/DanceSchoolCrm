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
var TeacherDetailFormComponent = (function () {
    function TeacherDetailFormComponent() {
        this.showGroupDetails = new core_1.EventEmitter();
        this.showUser = new core_1.EventEmitter();
        this.teacherDelete = new core_1.EventEmitter();
        this.loadGroups = new core_1.EventEmitter();
        this.addGroup = new core_1.EventEmitter();
        this.removeGroup = new core_1.EventEmitter();
        this.addingGroup = false;
    }
    TeacherDetailFormComponent.prototype.ngOnChanges = function () {
        this.isLastPage = this.allGroups.total != this.allGroups.groups.length;
    };
    TeacherDetailFormComponent.prototype.loadNextGroups = function (data) {
        this.loadGroups.emit({ teacher: this.model.id, page: data.page, filter: data.filter });
    };
    TeacherDetailFormComponent.prototype.groupSelected = function (data) {
        this.addGroup.emit({ teacher: this.model.id, group: data.id });
        this.addingGroup = false;
    };
    TeacherDetailFormComponent.prototype.onGroupRemove = function (groupId) {
        this.removeGroup.emit({ teacher: this.model.id, group: groupId });
    };
    TeacherDetailFormComponent.prototype.showDetails = function (id) { this.showGroupDetails.emit(id); };
    TeacherDetailFormComponent.prototype.showUserInfo = function () { this.showUser.emit(this.model.id); };
    TeacherDetailFormComponent.prototype.deleteTeacher = function () { this.teacherDelete.emit(this.model); };
    return TeacherDetailFormComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", teacher_1.Teacher)
], TeacherDetailFormComponent.prototype, "model", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TeacherDetailFormComponent.prototype, "allGroups", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TeacherDetailFormComponent.prototype, "showGroupDetails", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TeacherDetailFormComponent.prototype, "showUser", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TeacherDetailFormComponent.prototype, "teacherDelete", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TeacherDetailFormComponent.prototype, "loadGroups", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TeacherDetailFormComponent.prototype, "addGroup", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TeacherDetailFormComponent.prototype, "removeGroup", void 0);
TeacherDetailFormComponent = __decorate([
    core_1.Component({
        selector: 'teacher-detail-form',
        templateUrl: './teacher-detail-form.component.html'
    })
], TeacherDetailFormComponent);
exports.TeacherDetailFormComponent = TeacherDetailFormComponent;
//# sourceMappingURL=teacher-detail-form.component.js.map