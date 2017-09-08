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
;
var teachers_component_1 = require("../teacher/teachers.component");
var teacher_list_component_1 = require("../teacher/teacher-list.component");
var teacher_detail_component_1 = require("../teacher/teacher-detail.component");
var teacher_detail_form_component_1 = require("../teacher/teacher-detail-form.component");
var teacher_add_component_1 = require("../teacher/teacher-add.component");
var teacher_add_form_component_1 = require("../teacher/teacher-add-form.component");
var teacher_service_1 = require("../../services/teacher.service");
var teacher_actions_1 = require("../../actions/teacher.actions");
var teacher_effects_1 = require("../../effects/teacher.effects");
var TeacherModule = (function () {
    function TeacherModule() {
    }
    return TeacherModule;
}());
TeacherModule = __decorate([
    core_1.NgModule({
        imports: [
            shared_module_1.SharedModule,
            ngx_pagination_1.NgxPaginationModule,
            effects_1.EffectsModule.forFeature([teacher_effects_1.TeacherEffects]),
            ngx_paged_select_1.SelectModule
        ],
        declarations: [
            teachers_component_1.TeachersComponent,
            teacher_list_component_1.TeacherListComponent,
            teacher_detail_component_1.TeacherDetailComponent,
            teacher_detail_form_component_1.TeacherDetailFormComponent,
            teacher_add_component_1.TeacherAddComponent,
            teacher_add_form_component_1.TeacherAddFormComponent
        ],
        exports: [teachers_component_1.TeachersComponent],
        providers: [teacher_service_1.TeacherService, teacher_actions_1.TeacherActions]
    })
], TeacherModule);
exports.TeacherModule = TeacherModule;
//# sourceMappingURL=teacher.module.js.map