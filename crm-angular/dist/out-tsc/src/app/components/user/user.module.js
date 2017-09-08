"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var shared_module_1 = require("../shared/shared.module");
var effects_1 = require("@ngrx/effects");
var ngx_pagination_1 = require("ngx-pagination");
var ngx_paged_select_1 = require("ngx-paged-select");
var users_component_1 = require("../user/users.component");
var user_list_component_1 = require("../user/user-list.component");
var user_detail_component_1 = require("../user/user-detail.component");
var user_detail_form_component_1 = require("../user/user-detail-form.component");
var user_add_component_1 = require("../user/user-add.component");
var user_add_form_component_1 = require("../user/user-add-form.component");
var user_service_1 = require("../../services/user.service");
var user_actions_1 = require("../../actions/user.actions");
var user_effects_1 = require("../../effects/user.effects");
var UserModule = (function () {
    function UserModule() {
    }
    return UserModule;
}());
UserModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            ngx_pagination_1.NgxPaginationModule,
            effects_1.EffectsModule.forFeature([user_effects_1.UserEffects]),
            ngx_paged_select_1.SelectModule
        ],
        declarations: [
            users_component_1.UsersComponent,
            user_list_component_1.UserListComponent,
            user_detail_component_1.UserDetailComponent,
            user_detail_form_component_1.UserDetailFormComponent,
            user_add_component_1.UserAddComponent,
            user_add_form_component_1.UserAddFormComponent
        ],
        exports: [users_component_1.UsersComponent],
        providers: [user_service_1.UserService, user_actions_1.UserActions]
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map