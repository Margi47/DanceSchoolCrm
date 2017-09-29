import { UserList } from './userList.po';

describe('UserList Page', () => {

    const mainPage: UserList = new UserList();

    beforeEach(() => {
        mainPage.navigateToList();
    });

    it('should display the empty search', () => {
        expect(mainPage.getTableSearchText()).toEqual("");
    });

    it('should have a table header', () => {
        expect(mainPage.getTableHeaderText()).toContain("Id Name Phone Email Status Add");
    })
    it('table should have at least one row', () => {
        expect(mainPage.getFirstRowData()).toContain("Mr N");
    })

    it('should show first page', () => {
        expect(mainPage.getPage()).toContain("1");
    })

    it('should accept search input and implement search', () => {
        mainPage.getTableSearch().sendKeys("Mr N");
        //expect(mainPage.getTableSearchText()).toEqual("Mr N");
        expect(mainPage.getFirstRowData()).toEqual(mainPage.getLastRowData());
        expect(mainPage.getTableRowsCount()).toEqual(1);
        expect(mainPage.getPageCount()).toEqual(3);
    })
});
