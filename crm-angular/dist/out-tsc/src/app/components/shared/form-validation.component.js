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
var forms_1 = require("@angular/forms");
var FormValidationComponent = (function () {
    function FormValidationComponent() {
    }
    Object.defineProperty(FormValidationComponent.prototype, "requiredMessage", {
        get: function () {
            if (this._requiredMessage) {
                return this._requiredMessage;
            }
            else if (this.fieldName) {
                return this.fieldName + " is required.";
            }
            return "Field is required.";
        },
        set: function (message) {
            this._requiredMessage = message;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormValidationComponent.prototype, "minMessage", {
        get: function () {
            if (this._minMessage) {
                return this._minMessage;
            }
            else if (this.fieldName) {
                return this.fieldName + " has to be longer.";
            }
            return "Field has to be longer.";
        },
        set: function (message) {
            this._minMessage = message;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormValidationComponent.prototype, "maxMessage", {
        get: function () {
            if (this._maxMessage) {
                return this._maxMessage;
            }
            else if (this.fieldName) {
                return this.fieldName + " has to be shorter.";
            }
            return "Field has to be shorter.";
        },
        set: function (message) {
            this._maxMessage = message;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormValidationComponent.prototype, "patternMessage", {
        get: function () {
            if (this._patternMessage) {
                return this._patternMessage;
            }
            else if (this.fieldName) {
                return this.fieldName + " data does not match required pattern.";
            }
            return "Field data does not match required pattern.";
        },
        set: function (message) {
            this._patternMessage = message;
        },
        enumerable: true,
        configurable: true
    });
    return FormValidationComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormControl)
], FormValidationComponent.prototype, "model", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], FormValidationComponent.prototype, "fieldName", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], FormValidationComponent.prototype, "requiredMessage", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], FormValidationComponent.prototype, "minMessage", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], FormValidationComponent.prototype, "maxMessage", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], FormValidationComponent.prototype, "patternMessage", null);
FormValidationComponent = __decorate([
    core_1.Component({
        selector: 'form-validation',
        templateUrl: 'form-validation.component.html',
        styles: ['.alert-danger {line-height: 5px}']
    })
], FormValidationComponent);
exports.FormValidationComponent = FormValidationComponent;
//# sourceMappingURL=form-validation.component.js.map