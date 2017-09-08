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
var UserAddFormComponent = (function () {
    function UserAddFormComponent() {
        this.model = new user_1.User();
        this.newUser = true;
        this.userSave = new core_1.EventEmitter();
        this.userCancel = new core_1.EventEmitter();
    }
    UserAddFormComponent.prototype.onUserSubmit = function () { this.userSave.emit(this.model); };
    UserAddFormComponent.prototype.onUserCancel = function () { this.userCancel.emit(); };
    UserAddFormComponent.prototype.isActiveClicked = function (value) {
        if (!value) {
            this.model.isActive = false;
            this.model.isAdmin = false;
            this.model.isTeacher = false;
        }
        else {
            this.model.isActive = true;
        }
    };
    return UserAddFormComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], UserAddFormComponent.prototype, "errors", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], UserAddFormComponent.prototype, "userSave", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], UserAddFormComponent.prototype, "userCancel", void 0);
UserAddFormComponent = __decorate([
    core_1.Component({
        selector: 'user-add-form',
        templateUrl: './user-form.component.html'
    })
], UserAddFormComponent);
exports.UserAddFormComponent = UserAddFormComponent;
//# sourceMappingURL=user-add-form.component.js.map