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
var TeacherListComponent = (function () {
    function TeacherListComponent() {
        this.add = new core_1.EventEmitter();
        this.teacherDetails = new core_1.EventEmitter();
        this.pageChanged = new core_1.EventEmitter();
        this.currentPage = 1;
    }
    TeacherListComponent.prototype.addTeacher = function () { this.add.emit(); };
    TeacherListComponent.prototype.showTeacherDetails = function (id) { this.teacherDetails.emit(id); };
    TeacherListComponent.prototype.pageChange = function (page) {
        this.currentPage = page;
        this.pageChanged.emit(page);
    };
    return TeacherListComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], TeacherListComponent.prototype, "teachers", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TeacherListComponent.prototype, "add", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TeacherListComponent.prototype, "teacherDetails", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TeacherListComponent.prototype, "pageChanged", void 0);
TeacherListComponent = __decorate([
    core_1.Component({
        selector: 'teachers-list',
        templateUrl: './teacher-list.component.html',
        styles: ['tr td, th {vertical-align:middle}']
    })
], TeacherListComponent);
exports.TeacherListComponent = TeacherListComponent;
//# sourceMappingURL=teacher-list.component.js.map