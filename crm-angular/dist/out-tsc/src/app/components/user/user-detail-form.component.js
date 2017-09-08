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
var user_1 = require("../../models/user");
var UserDetailFormComponent = (function () {
    function UserDetailFormComponent() {
        this.newUser = false;
        this.userSubmit = new core_1.EventEmitter();
        this.userDelete = new core_1.EventEmitter();
        this.loadNextGroups = new core_1.EventEmitter();
        this.addUserGroup = new core_1.EventEmitter();
        this.showGroupDetails = new core_1.EventEmitter();
        this.removeUserGroup = new core_1.EventEmitter();
        this.goToTeacher = new core_1.EventEmitter();
        this.isTeacherChanged = new core_1.EventEmitter();
        this.addingGroup = false;
    }
    UserDetailFormComponent.prototype.ngOnChanges = function () {
        this.isLastPage = this.allGroups.total != this.allGroups.groups.length;
    };
    UserDetailFormComponent.prototype.onUserSubmit = function () { this.userSubmit.emit(this.model); };
    UserDetailFormComponent.prototype.onUserDelete = function () { this.userDelete.emit(this.model); };
    UserDetailFormComponent.prototype.addGroup = function (data) {
        this.addingGroup = false;
        this.addUserGroup.emit({ userId: this.model.id, groupId: data.id });
    };
    UserDetailFormComponent.prototype.loadNextPage = function (data) {
        this.loadNextGroups.emit({ user: this.model.id, page: data.page, filter: data.filter });
    };
    UserDetailFormComponent.prototype.showDetails = function (id) { this.showGroupDetails.emit(id); };
    UserDetailFormComponent.prototype.removeGroup = function (id) { this.removeUserGroup.emit({ userId: this.model.id, groupId: id }); };
    UserDetailFormComponent.prototype.onTeacherDetails = function () { this.goToTeacher.emit(this.model.id); };
    UserDetailFormComponent.prototype.isTeacherClicked = function (value) {
        this.model.isTeacher = value;
        this.isTeacherChanged.emit({ user: this.model, value: value });
    };
    UserDetailFormComponent.prototype.isActiveClicked = function (value) {
        if (!value) {
            this.model.isActive = false;
            this.model.isAdmin = false;
            if (this.model.isTeacher) {
                this.isTeacherClicked(false);
            }
        }
        else {
            this.model.isActive = true;
        }
    };
    return UserDetailFormComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", user_1.User)
], UserDetailFormComponent.prototype, "model", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], UserDetailFormComponent.prototype, "allGroups", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], UserDetailFormComponent.prototype, "errors", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], UserDetailFormComponent.prototype, "userSubmit", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], UserDetailFormComponent.prototype, "userDelete", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], UserDetailFormComponent.prototype, "loadNextGroups", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], UserDetailFormComponent.prototype, "addUserGroup", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], UserDetailFormComponent.prototype, "showGroupDetails", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], UserDetailFormComponent.prototype, "removeUserGroup", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], UserDetailFormComponent.prototype, "goToTeacher", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], UserDetailFormComponent.prototype, "isTeacherChanged", void 0);
UserDetailFormComponent = __decorate([
    core_1.Component({
        selector: 'user-detail-form',
        templateUrl: './user-form.component.html'
    })
], UserDetailFormComponent);
exports.UserDetailFormComponent = UserDetailFormComponent;
//# sourceMappingURL=user-detail-form.component.js.map