"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var userList_po_1 = require("./userList.po");
describe('UserList Page', function () {
    var mainPage = new userList_po_1.UserList();
    beforeEach(function () {
        mainPage.navigateToList();
    });
    it('should display the heading Pastebin Application', function () {
        expect(mainPage.getTableSearch()).toEqual("");
    });
    it('should have a table header', function () {
        expect(mainPage.getTableHeader()).toContain("Id Name Phone Email Status Add");
    });
    it('table should have at least one row', function () {
        expect(mainPage.getFirstRowData()).toContain("Hello world");
    });
    it('should have the app-add-paste tag', function () {
        expect(mainPage.getPage()).toContain("1");
    });
});
//# sourceMappingURL=tests.e2e-spec.js.map