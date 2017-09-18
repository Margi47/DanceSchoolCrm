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
var store_1 = require("@ngrx/store");
var group_actions_1 = require("../../actions/group.actions");
var error_actions_1 = require("../../actions/error.actions");
var router_actions_1 = require("../../actions/router.actions");
var GroupAddComponent = (function () {
    function GroupAddComponent(store, groupActions, routerActions, errorActions) {
        this.store = store;
        this.groupActions = groupActions;
        this.routerActions = routerActions;
        this.errorActions = errorActions;
        this.errors$ = this.store.select('errorFields');
    }
    GroupAddComponent.prototype.onGroupSubmit = function (group) {
        this.store.dispatch(this.groupActions.addGroup(group));
    };
    GroupAddComponent.prototype.onGroupCancel = function () {
        this.store.dispatch(this.routerActions.back());
    };
    return GroupAddComponent;
}());
GroupAddComponent = __decorate([
    core_1.Component({
        selector: 'add-group',
        template: "\n<div  class=\"col-sm-6\">\n    <group-add-form [errors] = \"errors$ | async\"\n                    (groupSave)=\"onGroupSubmit($event)\" \n                    (groupCancel)=\"onGroupCancel()\">\n    </group-add-form>\n</div>"
    }),
    __metadata("design:paramtypes", [store_1.Store,
        group_actions_1.GroupActions,
        router_actions_1.RouterActions,
        error_actions_1.ErrorActions])
], GroupAddComponent);
exports.GroupAddComponent = GroupAddComponent;
//# sourceMappingURL=group-add.component.js.map