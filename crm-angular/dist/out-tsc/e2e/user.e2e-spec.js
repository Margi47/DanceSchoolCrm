"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_list_po_1 = require("./user-list.po");
var user_add_po_1 = require("./user-add.po");
var user_details_po_1 = require("./user-details.po");
var time_helper_1 = require("./helpers/time.helper");
var protractor_1 = require("protractor");
describe('Users Page', function () {
    var userListPage = new user_list_po_1.UserList();
    var userAddPage = new user_add_po_1.UserAdd();
    var userDetailsPage = new user_details_po_1.UserDetails();
    it('should accept search input and implement search', function () {
        userListPage.navigateToList()
            .then(function () { return userListPage.performSearch("na"); }) //wait
            .then(function () { expect(userListPage.getFirstRowName()).toContain("na"); })
            .then(function () { return userListPage.performSearch("to"); }) //wait
            .then(function () { expect(userListPage.getFirstRowName()).toContain("to"); })
            .then(function () { return userListPage.performSearch("ndgrenaifnvfdlkv"); }) //wait
            .then(function () { expect(userListPage.getTableRowsCount()).toEqual(0); });
    });
    it('should validate user inputs', function () {
        userAddPage.navigateToAddForm()
            .then(function () { expect(userAddPage.getSaveButton().isEnabled()).toBeFalsy(); })
            .then(function () { return userAddPage.inputInvalidData(); })
            .then(function () { expect(userAddPage.getNameValidatorText()).toContain("required"); })
            .then(function () { expect(userAddPage.getPhoneValidatorText()).toContain("pattern"); })
            .then(function () { expect(userAddPage.getEmailValidatorText()).toContain("pattern"); })
            .then(function () { expect(userAddPage.getAdminInput().isEnabled()).toBeFalsy(); })
            .then(function () { expect(userAddPage.getTeacherInput().isEnabled()).toBeFalsy(); })
            .then(function () { expect(userAddPage.getSaveButton().isEnabled()).toBeFalsy(); });
    });
    it('should add new user', function () {
        userAddPage.navigateToAddForm()
            .then(function () { return userAddPage.getNameInput().sendKeys("Jack Sparrow"); })
            .then(function () { return userAddPage.getSaveButton().click(); })
            .then(function () { return time_helper_1.TimeHelper.waitForVisibility(userDetailsPage.getTable()); })
            .then(function () { return userListPage.navigateToList(); })
            .then(function () { return userListPage.performSearch("sparrow"); }) //wait
            .then(function () { expect(userListPage.getTableRowsCount()).toBeGreaterThan(0); })
            .then(function () { expect(userListPage.getFirstRowName()).toContain("jack sparrow"); });
    });
    it('should edit user groups', function () {
        userListPage.navigateToList()
            .then(function () { return userListPage.performSearch("sparrow"); }) //wait
            .then(function () { return userListPage.getFirstRowId(); })
            .then(function (id) { return userDetailsPage.navigateToDetailsForm(id); })
            .then(function () { return userDetailsPage.addNewGroup(1); })
            .then(function () { expect(userDetailsPage.getTableRowsCount()).toBe(1); })
            .then(function () { return protractor_1.browser.sleep(5000); })
            .then(function () { return userDetailsPage.deleteFirstGroup(); })
            .then(function () { expect(userDetailsPage.getTableRowsCount()).toBe(0); });
    });
    it('should delete user', function () {
        var rowsCount;
        userListPage.navigateToList()
            .then(function () { return userListPage.performSearch("sparrow"); }) //wait
            .then(function () { return userListPage.getTableRowsCount(); })
            .then(function (num) { return rowsCount = num; })
            .then(function () { return userListPage.getFirstRowId(); })
            .then(function (id) { return userDetailsPage.navigateToDetailsForm(id); })
            .then(function () { return userDetailsPage.getDeleteButton().click(); })
            .then(function () { return time_helper_1.TimeHelper.waitForVisibility(userListPage.getTable()); })
            .then(function () { return userListPage.performSearch("sparrow"); }) //wait
            .then(function () { expect(userListPage.getTableRowsCount()).toBe(rowsCount - 1); });
    });
});
//# sourceMappingURL=user.e2e-spec.js.map