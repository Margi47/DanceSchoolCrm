import { browser, by, element, promise, ElementFinder, ElementArrayFinder, protractor,  ExpectedConditions} from 'protractor';


export class UserDetails {

    navigateToDetailsForm(id: string): promise.Promise<any> {
        return browser.get(`/userdetail/${id}`);
    }

    getSelect(): ElementFinder {
        return element(by.tagName('ngx-paged-select'));
    }

    getSelectInput(): ElementFinder {
        return this.getSelect().element(by.tagName('input'));
    }

    getTable(): ElementFinder {
        return element(by.tagName('table'));
    }

    getAddButton(): ElementFinder {
        return this.getTable().element(by.tagName('thead')).element(by.tagName('button'));
    }

    getTableRows(): ElementArrayFinder {
        return this.getTable().element(by.tagName('tbody')).all(by.tagName('tr'));
    }

    getTableRowsCount(): promise.Promise<number> {
        return this.getTableRows().count();
    }

    getDeleteButton(): ElementFinder {
        return element(by.id('deleteButton'));
    }
}
