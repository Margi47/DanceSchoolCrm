"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var http_2 = require("@angular/http");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var store_1 = require("@ngrx/store");
var effects_1 = require("@ngrx/effects");
var app_routing_module_1 = require("./app-routing.module");
var group_module_1 = require("../group/group.module");
var user_module_1 = require("../user/user.module");
var teacher_module_1 = require("../teacher/teacher.module");
var shared_module_1 = require("../shared/shared.module");
var app_component_1 = require("./app.component");
var error_component_1 = require("./error.component");
var reducers_1 = require("../../reducers");
var error_actions_1 = require("../../actions/error.actions");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        bootstrap: [app_component_1.AppComponent],
        declarations: [
            app_component_1.AppComponent,
            error_component_1.ErrorComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            http_2.JsonpModule,
            http_1.HttpModule,
            app_routing_module_1.AppRoutingModule,
            forms_1.FormsModule,
            group_module_1.GroupModule,
            user_module_1.UserModule,
            teacher_module_1.TeacherModule,
            shared_module_1.SharedModule,
            store_1.StoreModule.forRoot(reducers_1.reducers),
            effects_1.EffectsModule.forRoot([])
        ],
        providers: [error_actions_1.ErrorActions, { provide: 'ORIGIN_URL', useValue: location.origin }]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map