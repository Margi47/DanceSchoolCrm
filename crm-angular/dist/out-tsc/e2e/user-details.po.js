"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var UserDetails = (function () {
    function UserDetails() {
    }
    UserDetails.prototype.navigateToDetailsForm = function (id) {
        return protractor_1.browser.get("/userdetail/" + id);
    };
    UserDetails.prototype.getSelect = function () {
        return protractor_1.element(protractor_1.by.tagName('ngx-paged-select'));
    };
    UserDetails.prototype.getSelectInput = function () {
        return this.getSelect().element(protractor_1.by.tagName('input'));
    };
    UserDetails.prototype.getTable = function () {
        return protractor_1.element(protractor_1.by.tagName('table'));
    };
    UserDetails.prototype.getAddButton = function () {
        return this.getTable().element(protractor_1.by.tagName('thead')).element(protractor_1.by.tagName('button'));
    };
    UserDetails.prototype.getTableRows = function () {
        return this.getTable().element(protractor_1.by.tagName('tbody')).all(protractor_1.by.tagName('tr'));
    };
    UserDetails.prototype.getTableRowsCount = function () {
        return this.getTableRows().count();
    };
    UserDetails.prototype.getDeleteButton = function () {
        return protractor_1.element(protractor_1.by.id('deleteButton'));
    };
    return UserDetails;
}());
exports.UserDetails = UserDetails;
//# sourceMappingURL=user-details.po.js.map