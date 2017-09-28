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
var UserListComponent = (function () {
    function UserListComponent() {
        var _this = this;
        this.add = new core_1.EventEmitter();
        this.details = new core_1.EventEmitter();
        this.loadUsers = new core_1.EventEmitter();
        this.currentPage = 1;
        this.currentFilter = "";
        this.search = new Rx_1.Subject();
        var observable = this.search
            .debounceTime(400)
            .distinctUntilChanged()
            .subscribe(function (data) {
            _this.currentFilter = data;
            _this.loadUsers.emit({ page: _this.currentPage, filter: data });
        });
    }
    UserListComponent.prototype.addUser = function () { this.add.emit(); };
    UserListComponent.prototype.showDetails = function (id) { this.details.emit(id); };
    UserListComponent.prototype.pageChange = function (page) {
        this.currentPage = page;
        this.loadUsers.emit({ page: page, filter: this.currentFilter });
    };
    return UserListComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], UserListComponent.prototype, "users", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], UserListComponent.prototype, "add", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], UserListComponent.prototype, "details", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], UserListComponent.prototype, "loadUsers", void 0);
UserListComponent = __decorate([
    core_1.Component({
        selector: 'users-list',
        templateUrl: './user-list.component.html',
        styles: ['tr td, th {vertical-align:middle}']
    }),
    __metadata("design:paramtypes", [])
], UserListComponent);
exports.UserListComponent = UserListComponent;
//# sourceMappingURL=user-list.component.js.map