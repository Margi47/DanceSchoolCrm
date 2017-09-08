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
var GroupListComponent = (function () {
    function GroupListComponent() {
        this.addNewGroup = new core_1.EventEmitter();
        this.groupDetails = new core_1.EventEmitter();
        this.pageChanged = new core_1.EventEmitter();
        this.currentPage = 1;
    }
    GroupListComponent.prototype.addGroup = function () { this.addNewGroup.emit(); };
    GroupListComponent.prototype.showDetails = function (id) { this.groupDetails.emit(id); };
    GroupListComponent.prototype.pageChange = function (page) {
        this.currentPage = page;
        this.pageChanged.emit(page);
    };
    return GroupListComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], GroupListComponent.prototype, "groups", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], GroupListComponent.prototype, "addNewGroup", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], GroupListComponent.prototype, "groupDetails", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], GroupListComponent.prototype, "pageChanged", void 0);
GroupListComponent = __decorate([
    core_1.Component({
        selector: 'group-list',
        templateUrl: './group-list.component.html',
        styles: ['tr td, th {vertical-align:middle}']
    })
], GroupListComponent);
exports.GroupListComponent = GroupListComponent;
//# sourceMappingURL=group-list.component.js.map