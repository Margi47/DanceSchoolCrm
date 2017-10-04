import { UserList } from './userList.po';
import { by, element } from 'protractor';

describe('UserList Page', () => {

    const mainPage: UserList = new UserList();

    beforeEach(() => {
        mainPage.navigateToList();
    });

    it('should start up right', () => {
        expect(mainPage.getTableHeaderText()).toContain("Id Name Phone Email Status Add");
        expect(mainPage.getTableSearchText()).toEqual("");
        expect(mainPage.getPageCount()).toEqual(7);
        expect(mainPage.getPageText()).toContain("1");
    });

    it('should accept search input and implement search', () => {
        mainPage.getTableSearch().sendKeys("Mr N");
        expect(mainPage.getFirstRowData()).toEqual(mainPage.getLastRowData());
        expect(mainPage.getTableRowsCount()).toEqual(1);
        expect(mainPage.getPageCount()).toEqual(3);

        mainPage.getTableSearch().clear();
        mainPage.getTableSearch().sendKeys("na");
        expect(mainPage.getPageCount()).toEqual(4);
        mainPage.getTableRows().each(function (element, index) {
            let name = element.all(by.tagName('td')).get(0).getText().then(x => x.toLowerCase());
            expect(name).toContain("na");
        });

        mainPage.getPageArray(3).click();
        expect(mainPage.getTableRowsCount()).toEqual(2);
    })
});
