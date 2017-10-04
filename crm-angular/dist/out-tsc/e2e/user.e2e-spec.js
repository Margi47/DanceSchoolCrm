"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var userList_po_1 = require("./userList.po");
var userAdd_po_1 = require("./userAdd.po");
describe('Users Page', function () {
    var userListPage = new userList_po_1.UserList();
    var userAddPage = new userAdd_po_1.UserAdd();
    it('should accept search input and implement search', function () {
        userListPage.navigateToList();
        userListPage.getTableSearch().sendKeys("na");
        expect(userListPage.getFirstRowName()).toContain("na");
        userListPage.getTableSearch().clear();
        userListPage.getTableSearch().sendKeys("to");
        expect(userListPage.getFirstRowName()).toContain("to");
        userListPage.getTableSearch().clear();
        userListPage.getTableSearch().sendKeys("ndgrenaifnvfdlkv");
        expect(userListPage.getTableRowsCount()).toEqual(0);
    });
    it('should validate user inputs', function () {
        userAddPage.navigateToAddForm();
        userAddPage.getNameInput().sendKeys("abc")
            .then(function () { return userAddPage.getNameInput().clear(); });
        //browser.pause();
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
            .then(function () { return userListPage.navigateToList(); })
            .then(function () { return userListPage.getTableSearch().sendKeys("sparrow"); })
            .then(function () { expect(userListPage.getFirstRowName()).toContain("jack sparrow"); });
    });
});
//# sourceMappingURL=user.e2e-spec.js.map