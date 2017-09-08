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
var groups_component_1 = require("./groups.component");
var group_list_component_1 = require("./group-list.component");
var group_detail_component_1 = require("./group-detail.component");
var group_detail_form_component_1 = require("./group-detail-form.component");
var group_add_component_1 = require("./group-add.component");
var group_add_form_component_1 = require("./group-add-form.component");
var group_service_1 = require("../../services/group.service");
var group_actions_1 = require("../../actions/group.actions");
var group_effects_1 = require("../../effects/group.effects");
var GroupModule = (function () {
    function GroupModule() {
    }
    return GroupModule;
}());
GroupModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            ngx_pagination_1.NgxPaginationModule,
            effects_1.EffectsModule.forFeature([group_effects_1.GroupEffects]),
            ngx_paged_select_1.SelectModule
        ],
        declarations: [
            groups_component_1.GroupsComponent,
            group_list_component_1.GroupListComponent,
            group_detail_component_1.GroupDetailComponent,
            group_detail_form_component_1.GroupDetailFormComponent,
            group_add_component_1.GroupAddComponent,
            group_add_form_component_1.GroupAddFormComponent
        ],
        exports: [groups_component_1.GroupsComponent],
        providers: [group_service_1.GroupService, group_actions_1.GroupActions]
    })
], GroupModule);
exports.GroupModule = GroupModule;
//# sourceMappingURL=group.module.js.map