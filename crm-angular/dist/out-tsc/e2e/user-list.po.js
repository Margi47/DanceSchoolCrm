"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var UserList = (function () {
    function UserList() {
    }
    UserList.prototype.navigateToList = function () {
        return protractor_1.browser.get('/users');
    };
    UserList.prototype.getTable = function () {
        return protractor_1.element(protractor_1.by.css('.table'));
    };
    UserList.prototype.getTableSearch = function () {
        return this.getTable().element(protractor_1.by.tagName('thead'))
            .element(protractor_1.by.tagName('input'));
    };
    UserList.prototype.getTableBody = function () {
        return this.getTable().element(protractor_1.by.tagName('tbody'));
    };
    UserList.prototype.getTableRows = function () {
        return this.getTableBody().all(protractor_1.by.tagName('tr'));
    };
    UserList.prototype.getTableRowsCount = function () {
        return this.getTableRows().count();
    };
    UserList.prototype.getFirstRowName = function () {
        return this.getTableRows().get(0).all(protractor_1.by.tagName('td'))
            .get(0).getText().then(function (x) { return x.toLowerCase(); });
    };
    UserList.prototype.getFirstRowId = function () {
        return this.getTableRows().get(0).element(protractor_1.by.tagName('th')).getText();
    };
    UserList.prototype.performSearch = function (key) {
        var _this = this;
        return this.getTableSearch().clear().then(function () { return _this.getTableSearch().sendKeys(key); });
    };
    return UserList;
}());
exports.UserList = UserList;
//# sourceMappingURL=user-list.po.js.map