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
    /* Pastebin Heading
    getPastebinHeading(): promise.Promise<string> {
        return this.getPastebin().element(by.css("h2")).getText();
    }

    Table Data

    getTable(): ElementFinder {
        return this.getTable().element(by.css('table'));

    }*/
    UserList.prototype.getTableHeader = function () {
        return this.getTable().all(protractor_1.by.tagName('tr')).get(0).getText();
    };
    UserList.prototype.getTableSearch = function () {
        return this.getTable().all(protractor_1.by.tagName('tr')).get(1).getText();
    };
    UserList.prototype.getTableBody = function () {
        return protractor_1.element(protractor_1.by.tagName('tbody'));
    };
    UserList.prototype.getTableRow = function () {
        return this.getTableBody().all(protractor_1.by.tagName('tr'));
    };
    UserList.prototype.getFirstRowData = function () {
        return this.getTableRow().get(0).getText();
    };
    UserList.prototype.getLastRowData = function () {
        return this.getTableRow().last().getText();
    };
    /*app-add-paste tag*/
    UserList.prototype.getPageElement = function () {
        return protractor_1.element(protractor_1.by.tagName('pagination-controls'));
    };
    UserList.prototype.getPage = function () {
        return this.getPageElement().getText();
    };
    return UserList;
}());
exports.UserList = UserList;
//# sourceMappingURL=userList.po.js.map