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
        userListPage.navigateToList();
        userListPage.performSearch("na");
        expect(userListPage.getFirstRowName()).toContain("na");
        userListPage.performSearch("to");
        expect(userListPage.getFirstRowName()).toContain("to");
        userListPage.performSearch("ndgrenaifnvfdlkv");
        expect(userListPage.getTableRowsCount()).toEqual(0);
    });
    it('should validate user inputs', function () {
        userAddPage.navigateToAddForm()
            .then(function () { expect(userAddPage.getSaveButton().isEnabled()).toBeFalsy(); });
        userAddPage.getNameInput().sendKeys("abc")
            .then(function () { return userAddPage.getNameInput().clear(); });
        //.then(() => { expect(userAddPage.getNameValidatorText()).toContain("required") });
        userAddPage.getPhoneInput().sendKeys("abc")
            .then(function () { expect(userAddPage.getPhoneValidatorText()).toContain("pattern"); });
        userAddPage.getEmailInput().sendKeys("abc")
            .then(function () { expect(userAddPage.getEmailValidatorText()).toContain("pattern"); });
        expect(userAddPage.getAdminInput().isEnabled()).toBeFalsy();
        expect(userAddPage.getTeacherInput().isEnabled()).toBeFalsy();
        expect(userAddPage.getSaveButton().isEnabled()).toBeFalsy();
    });
    it('should add new user', function () {
        userAddPage.navigateToAddForm();
        userAddPage.getNameInput().sendKeys("Jack Sparrow")
            .then(function () { return userAddPage.getSaveButton().click(); })
            .then(function () { return time_helper_1.TimeHelper.waitForVisibility(userDetailsPage.getTable()); })
            .then(function () { return userListPage.navigateToList(); })
            .then(function () { return userListPage.performSearch("sparrow"); })
            .then(function () { expect(userListPage.getTableRowsCount()).toBeGreaterThan(0); })
            .then(function () { expect(userListPage.getFirstRowName()).toContain("jack sparrow"); });
    });
    it('should edit user groups', function () {
        var groupsCount;
        userListPage.navigateToList();
        userListPage.performSearch("sparrow")
            .then(function () { return userListPage.getFirstRowId(); })
            .then(function (id) { return userDetailsPage.navigateToDetailsForm(id); })
            .then(function () { return groupsCount = userDetailsPage.getTableRowsCount(); })
            .then(function () { return userDetailsPage.getAddButton().click(); })
            .then(function () { return userDetailsPage.getSelect().click(); })
            .then(function () { return userDetailsPage.getSelectInput().sendKeys(protractor_1.Key.ARROW_DOWN); })
            .then(function () { return userDetailsPage.getSelectInput().sendKeys(protractor_1.Key.ENTER); })
            .then(function () { return time_helper_1.TimeHelper.waitForGroupsChange(groupsCount); })
            .then(function () { expect(userDetailsPage.getTableRowsCount()).toBe(1); });
    });
    it('should delete user', function () {
        userListPage.navigateToList();
        userListPage.performSearch("sparrow")
            .then(function () { return userListPage.getFirstRowId(); })
            .then(function (id) { return userDetailsPage.navigateToDetailsForm(id); })
            .then(function () { return userDetailsPage.getDeleteButton().click(); })
            .then(function () { return time_helper_1.TimeHelper.waitForVisibility(userListPage.getTable()); })
            .then(function () { return userListPage.performSearch("sparrow"); })
            .then(function () { expect(userListPage.getTableRowsCount()).toBe(0); });
    });
});
//# sourceMappingURL=user.e2e-spec.js.map