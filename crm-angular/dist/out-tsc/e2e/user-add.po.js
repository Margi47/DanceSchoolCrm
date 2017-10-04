"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var UserAdd = (function () {
    function UserAdd() {
    }
    UserAdd.prototype.navigateToAddForm = function () {
        return protractor_1.browser.get('/useradd');
    };
    UserAdd.prototype.getForm = function () {
        return protractor_1.element(protractor_1.by.tagName('form'));
    };
    UserAdd.prototype.getNameInput = function () {
        return this.getForm().element(protractor_1.by.id('nameInput'))
            .element(protractor_1.by.tagName('input'));
    };
    UserAdd.prototype.getNameValidatorText = function () {
        return this.getForm().element(protractor_1.by.id('nameInput'))
            .element(protractor_1.by.tagName('form-validation')).getText();
    };
    UserAdd.prototype.getPhoneInput = function () {
        return this.getForm().element(protractor_1.by.id('phoneInput'))
            .element(protractor_1.by.tagName('input'));
    };
    UserAdd.prototype.getPhoneValidatorText = function () {
        return this.getForm().element(protractor_1.by.id('phoneInput'))
            .element(protractor_1.by.tagName('form-validation')).getText();
    };
    UserAdd.prototype.getEmailInput = function () {
        return this.getForm().element(protractor_1.by.id('emailInput'))
            .element(protractor_1.by.tagName('input'));
    };
    UserAdd.prototype.getEmailValidatorText = function () {
        return this.getForm().element(protractor_1.by.id('emailInput'))
            .element(protractor_1.by.tagName('form-validation')).getText();
    };
    UserAdd.prototype.getActiveInput = function () {
        return this.getForm().element(protractor_1.by.name('active'));
    };
    UserAdd.prototype.getAdminInput = function () {
        return this.getForm().element(protractor_1.by.name('admin'));
    };
    UserAdd.prototype.getTeacherInput = function () {
        return this.getForm().element(protractor_1.by.name('teacher'));
    };
    UserAdd.prototype.getSaveButton = function () {
        return this.getForm().element(protractor_1.by.id('saveButton'));
    };
    return UserAdd;
}());
exports.UserAdd = UserAdd;
//# sourceMappingURL=user-add.po.js.map