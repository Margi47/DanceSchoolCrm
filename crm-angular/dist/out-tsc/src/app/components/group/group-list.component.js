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
var Rx_1 = require("rxjs/Rx");
var GroupListComponent = (function () {
    function GroupListComponent() {
        var _this = this;
        this.addNewGroup = new core_1.EventEmitter();
        this.groupDetails = new core_1.EventEmitter();
        this.loadGroups = new core_1.EventEmitter();
        this.currentPage = 1;
        this.currentFilter = "";
        this.search = new Rx_1.Subject();
        var observable = this.search
            .debounceTime(400)
            .distinctUntilChanged()
            .subscribe(function (data) {
            _this.currentFilter = data;
            _this.loadGroups.emit({ page: _this.currentPage, filter: data });
        });
    }
    GroupListComponent.prototype.addGroup = function () { this.addNewGroup.emit(); };
    GroupListComponent.prototype.showDetails = function (id) { this.groupDetails.emit(id); };
    GroupListComponent.prototype.pageChange = function (page) {
        this.currentPage = page;
        this.loadGroups.emit({ page: page, filter: this.currentFilter });
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
], GroupListComponent.prototype, "loadGroups", void 0);
GroupListComponent = __decorate([
    core_1.Component({
        selector: 'group-list',
        templateUrl: './group-list.component.html',
        styles: ['tr td, th {vertical-align:middle}']
    }),
    __metadata("design:paramtypes", [])
], GroupListComponent);
exports.GroupListComponent = GroupListComponent;
//# sourceMappingURL=group-list.component.js.map