import { browser, by, element, promise, ElementFinder, ElementArrayFinder, protractor,  ExpectedConditions, Key} from 'protractor';
import {TimeHelper} from './helpers/time.helper';

export class UserDetails {

    navigateToDetailsForm(id: string): promise.Promise<any> {
        return browser.get(`/userdetail/${id}`).then(() => TimeHelper.waitForVisibility(this.getTable()));
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

    getFistRowButton(): ElementFinder {
        return this.getTableRows().get(0).all(by.tagName('button')).get(1);
    }

    getTableRowsCount(): promise.Promise<number> {
        return this.getTableRows().count();
    }

    getDeleteButton(): ElementFinder {
        return element(by.id('deleteButton'));
    }

    addNewGroup(index: number) {
        let groupsCount;
        return this.getTableRowsCount()
            .then((num) => groupsCount = num)
            .then(() => this.getAddButton().click())
            .then(() => this.getSelect().click())
            .then(() => {
                let i = 0;
                while (i < index) {
                    this.getSelectInput().sendKeys(Key.ARROW_DOWN);
                    i++;
                }
            })
            .then(() => this.getSelectInput().sendKeys(Key.ENTER))
            .then(() => TimeHelper.waitForGroupsChange(groupsCount));
    }

    deleteFirstGroup() {
        let groupsCount;
        return this.getTableRowsCount()
            .then((num) => groupsCount = num)
            .then(() => this.getFistRowButton().click())
            .then(() => TimeHelper.waitForGroupsChange(groupsCount));
    }
}
