import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';


export class UserList {

    navigateToList(): promise.Promise<any> {
        return browser.get('/users');
    }

    getTable(): ElementFinder {
        return element(by.css('.table'));
    }

    getTableHeader(): ElementFinder {
        return this.getTable().element(by.tagName('thead'));
    }

    getTableSearch(): ElementFinder {
        return this.getTableHeader().element(by.tagName('input'));
    }

    getTableBody(): ElementFinder {
        return this.getTable().element(by.tagName('tbody'));
    }

    getTableHeaderText(): promise.Promise<string> {
        return this.getTableHeader().all(by.tagName('tr')).get(0).getText();
    }

    getTableSearchText(): promise.Promise<string> {
        return this.getTableSearch().getText();
    }

    getTableRows(): ElementArrayFinder {
        return this.getTableBody().all(by.tagName('tr'));
    }

    getTableRowsCount(): promise.Promise<number> {
        return this.getTableRows().count();
    }

    getFirstRowData(): promise.Promise<string> {
        return this.getTableRows().get(0).getText();
    }

    getLastRowData(): promise.Promise<string> {
        return this.getTableRows().last().getText();
    }

    getPageElement(): ElementFinder {
        return element(by.tagName('pagination-controls'));
    }

    getPageText(): promise.Promise<string> {
        return this.getPageElement().getText();
    }

    getPageArray(page: number): ElementFinder {
        return this.getPageElement().all(by.tagName('li')).get(page);
    }

    getPageCount(): promise.Promise<number> {
        return this.getPageElement().all(by.tagName('li')).count();
    }

}
