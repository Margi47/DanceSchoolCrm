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
var error_message_1 = require("../../models/error-message");
var ErrorComponent = (function () {
    function ErrorComponent() {
    }
    return ErrorComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", error_message_1.ErrorMessage)
], ErrorComponent.prototype, "errorMessage", void 0);
ErrorComponent = __decorate([
    core_1.Component({
        selector: 'error',
        template: "\n<Label *ngIf=\"errorMessage.statusCode != 0\">\n    Error: {{errorMessage.message}}\n<Label>"
    })
], ErrorComponent);
exports.ErrorComponent = ErrorComponent;
//# sourceMappingURL=error.component.js.map