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
    UserList.prototype.getTableHeader = function () {
        return this.getTable().element(protractor_1.by.tagName('thead'));
    };
    UserList.prototype.getTableSearch = function () {
        return this.getTableHeader().element(protractor_1.by.tagName('input'));
    };
    UserList.prototype.getTableBody = function () {
        return this.getTable().element(protractor_1.by.tagName('tbody'));
    };
    UserList.prototype.getTableHeaderText = function () {
        return this.getTableHeader().all(protractor_1.by.tagName('tr')).get(0).getText();
    };
    UserList.prototype.getTableSearchText = function () {
        return this.getTableSearch().getText();
    };
    UserList.prototype.getTableRows = function () {
        return this.getTableBody().all(protractor_1.by.tagName('tr'));
    };
    UserList.prototype.getTableRowsCount = function () {
        return this.getTableRows().count();
    };
    UserList.prototype.getFirstRowData = function () {
        return this.getTableRows().get(0).getText();
    };
    UserList.prototype.getLastRowData = function () {
        return this.getTableRows().last().getText();
    };
    UserList.prototype.getPageElement = function () {
        return protractor_1.element(protractor_1.by.tagName('pagination-controls'));
    };
    UserList.prototype.getPageText = function () {
        return this.getPageElement().getText();
    };
    UserList.prototype.getPageArray = function (page) {
        return this.getPageElement().all(protractor_1.by.tagName('li')).get(page);
    };
    UserList.prototype.getPageCount = function () {
        return this.getPageElement().all(protractor_1.by.tagName('li')).count();
    };
    return UserList;
}());
exports.UserList = UserList;
//# sourceMappingURL=userList.po.js.map