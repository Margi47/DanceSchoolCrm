"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var userList_po_1 = require("./userList.po");
var protractor_1 = require("protractor");
describe('UserList Page', function () {
    var mainPage = new userList_po_1.UserList();
    beforeEach(function () {
        mainPage.navigateToList();
    });
    it('should start up right', function () {
        expect(mainPage.getTableHeaderText()).toContain("Id Name Phone Email Status Add");
        expect(mainPage.getTableSearchText()).toEqual("");
        expect(mainPage.getPageCount()).toEqual(7);
        expect(mainPage.getPageText()).toContain("1");
    });
    it('should accept search input and implement search', function () {
        mainPage.getTableSearch().sendKeys("Mr N");
        expect(mainPage.getFirstRowData()).toEqual(mainPage.getLastRowData());
        expect(mainPage.getTableRowsCount()).toEqual(1);
        expect(mainPage.getPageCount()).toEqual(3);
        mainPage.getTableSearch().clear();
        mainPage.getTableSearch().sendKeys("na");
        expect(mainPage.getPageCount()).toEqual(4);
        mainPage.getTableRows().each(function (element, index) {
            var name = element.all(protractor_1.by.tagName('td')).get(0).getText().then(function (x) { return x.toLowerCase(); });
            expect(name).toContain("na");
        });
        mainPage.getPageArray(3).click();
        expect(mainPage.getTableRowsCount()).toEqual(2);
    });
});
//# sourceMappingURL=tests.e2e-spec.js.map