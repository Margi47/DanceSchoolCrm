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
var GroupAddFormComponent = (function () {
    function GroupAddFormComponent() {
        this.model = new group_1.Group();
        this.newGroup = true;
        this.groupSave = new core_1.EventEmitter();
        this.groupCancel = new core_1.EventEmitter();
    }
    GroupAddFormComponent.prototype.onGroupSubmit = function () { this.groupSave.emit(this.model); };
    GroupAddFormComponent.prototype.onCancel = function () { this.groupCancel.emit(); };
    return GroupAddFormComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], GroupAddFormComponent.prototype, "errors", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], GroupAddFormComponent.prototype, "groupSave", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], GroupAddFormComponent.prototype, "groupCancel", void 0);
GroupAddFormComponent = __decorate([
    core_1.Component({
        selector: 'group-add-form',
        templateUrl: './group-form.component.html'
    })
], GroupAddFormComponent);
exports.GroupAddFormComponent = GroupAddFormComponent;
//# sourceMappingURL=group-add-form.component.js.map