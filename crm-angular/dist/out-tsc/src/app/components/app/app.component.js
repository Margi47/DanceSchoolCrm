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
var error_actions_1 = require("../../actions/error.actions");
var router_actions_1 = require("../../actions/router.actions");
var AppComponent = (function () {
    function AppComponent(store, errorActions, routerActions) {
        this.store = store;
        this.errorActions = errorActions;
        this.routerActions = routerActions;
        this.errorMessage$ = store.select('errorMessage');
    }
    AppComponent.prototype.navigate = function (path) {
        this.store.dispatch(this.routerActions.go([path]));
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'app',
        templateUrl: './app.component.html'
    }),
    __metadata("design:paramtypes", [store_1.Store,
        error_actions_1.ErrorActions,
        router_actions_1.RouterActions])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map