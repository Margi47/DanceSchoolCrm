import { browser, by, element, promise, ElementFinder, ElementArrayFinder, protractor, ExpectedConditions } from 'protractor';
import { TimeHelper } from './helpers/time.helper';

export class UserList {

    navigateToList(): promise.Promise<any> {
        return browser.get('/users').then(() => TimeHelper.waitForVisibility(this.getTable()));
    }

    getTable(): ElementFinder {
        return element(by.css('.table'));
    }

    getTableSearch(): ElementFinder {
        return this.getTable().element(by.tagName('thead'))
            .element(by.tagName('input'));
    }

    getTableBody(): ElementFinder {
        return this.getTable().element(by.tagName('tbody'));
    }

    getTableRows(): ElementArrayFinder {
        return this.getTableBody().all(by.tagName('tr'));
    }

    getTableRowsCount(): promise.Promise<number> {
        return this.getTableRows().count();
    }

    getFirstRowName(): promise.Promise<string> {
        return this.getTableRows().get(0).all(by.tagName('td'))
            .get(0).getText().then(x => x.toLowerCase());
    }

    getFirstRowId(): promise.Promise<string> {
        return this.getTableRows().get(0).element(by.tagName('th')).getText();
    }

    performSearch(key: string): promise.Promise<void> {

        return this.getTableSearch().clear().then(() => this.getTableSearch().sendKeys(key));      
    }
}
