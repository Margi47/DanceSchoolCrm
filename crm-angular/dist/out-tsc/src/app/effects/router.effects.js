"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var effects_1 = require("@ngrx/effects");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var router_actions_1 = require("../actions/router.actions");
var RouterEffects = (function () {
    function RouterEffects(update$, routerActions, router, location) {
        var _this = this;
        this.update$ = update$;
        this.routerActions = routerActions;
        this.router = router;
        this.location = location;
        this.go$ = this.update$
            .ofType(router_actions_1.RouterActions.GO)
            .map(function (action) { return action.payload; })
            .do(function (_a) {
            var path = _a.path, queryParams = _a.query, extras = _a.extras;
            return _this.router.navigate(path, __assign({ queryParams: queryParams }, extras));
        });
        this.back$ = this.update$
            .ofType(router_actions_1.RouterActions.BACK)
            .do(function () { return _this.location.back(); });
        this.forward$ = this.update$
            .ofType(router_actions_1.RouterActions.FORWARD)
            .do(function () { return _this.location.forward(); });
    }
    return RouterEffects;
}());
__decorate([
    effects_1.Effect({ dispatch: false }),
    __metadata("design:type", Object)
], RouterEffects.prototype, "go$", void 0);
__decorate([
    effects_1.Effect({ dispatch: false }),
    __metadata("design:type", Object)
], RouterEffects.prototype, "back$", void 0);
__decorate([
    effects_1.Effect({ dispatch: false }),
    __metadata("design:type", Object)
], RouterEffects.prototype, "forward$", void 0);
RouterEffects = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [effects_1.Actions,
        router_actions_1.RouterActions,
        router_1.Router,
        common_1.Location])
], RouterEffects);
exports.RouterEffects = RouterEffects;
//# sourceMappingURL=router.effects.js.map