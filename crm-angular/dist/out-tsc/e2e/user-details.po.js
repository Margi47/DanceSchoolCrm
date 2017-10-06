"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var time_helper_1 = require("./helpers/time.helper");
var UserDetails = (function () {
    function UserDetails() {
    }
    UserDetails.prototype.navigateToDetailsForm = function (id) {
        var _this = this;
        return protractor_1.browser.get("/userdetail/" + id).then(function () { return time_helper_1.TimeHelper.waitForVisibility(_this.getTable()); });
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
    UserDetails.prototype.getFistRowButton = function () {
        return this.getTableRows().get(0).all(protractor_1.by.tagName('button')).get(1);
    };
    UserDetails.prototype.getTableRowsCount = function () {
        return this.getTableRows().count();
    };
    UserDetails.prototype.getDeleteButton = function () {
        return protractor_1.element(protractor_1.by.id('deleteButton'));
    };
    UserDetails.prototype.addNewGroup = function (index) {
        var _this = this;
        var groupsCount;
        return this.getTableRowsCount()
            .then(function (num) { return groupsCount = num; })
            .then(function () { return _this.getAddButton().click(); })
            .then(function () { return _this.getSelect().click(); })
            .then(function () {
            var i = 0;
            while (i < index) {
                _this.getSelectInput().sendKeys(protractor_1.Key.ARROW_DOWN);
                i++;
            }
        })
            .then(function () { return _this.getSelectInput().sendKeys(protractor_1.Key.ENTER); })
            .then(function () { return time_helper_1.TimeHelper.waitForGroupsChange(groupsCount); });
    };
    UserDetails.prototype.deleteFirstGroup = function () {
        var _this = this;
        var groupsCount;
        return this.getTableRowsCount()
            .then(function (num) { return groupsCount = num; })
            .then(function () { return _this.getFistRowButton().click(); })
            .then(function () { return time_helper_1.TimeHelper.waitForGroupsChange(groupsCount); });
    };
    return UserDetails;
}());
exports.UserDetails = UserDetails;
//# sourceMappingURL=user-details.po.js.map