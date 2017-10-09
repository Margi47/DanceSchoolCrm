import { browser, by, element, promise, ElementFinder, ElementArrayFinder, protractor,  ExpectedConditions, Key} from 'protractor';
import {TimeHelper} from '../helpers/time.helper';

export class Keys {
    public static teachers = "teachersList";
    public static students = "studentsList"
};

export class GroupDetailsPO {

    navigateToDetailsForm(id: string): promise.Promise<any> {
        return browser.get(`/groupdetail/${id}`).then(() => TimeHelper.waitForVisibility(this.getTable(Keys.teachers)));
    }

    getSection(key: string): ElementFinder {
        return element(by.id(key));
    }

    getSelect(key: string): ElementFinder {
        return this.getSection(key).element(by.tagName('ngx-paged-select'));
    }

    getSelectInput(key: string): ElementFinder {
        return this.getSelect(key).element(by.tagName('input'));
    }

    getTable(key: string): ElementFinder {
        return this.getSection(key).element(by.tagName('table'));
    }

    getAddButton(key: string): ElementFinder {
        return this.getTable(key).element(by.tagName('thead')).element(by.tagName('button'));
    }

    getTableRows(key: string): ElementArrayFinder {
        return this.getTable(key).element(by.tagName('tbody')).all(by.tagName('tr'));
    }

    getFistRowButton(key: string): ElementFinder {
        return this.getTableRows(key).get(0).all(by.tagName('button')).get(1);
    }

    getTableRowsCount(key: string): promise.Promise<number> {
        return this.getTableRows(key).count();
    }

    getDeleteButton(): ElementFinder {
        return element(by.id('deleteButton'));
    }

    addNewItem(key: string, index: number) {
        let count;
        return this.getTableRowsCount(key)
            .then((num) => count = num)
            .then(() => this.getAddButton(key).click())
            .then(() => this.getSelect(key).click())
            .then(() => {
                let i = 0;
                while (i < index) {
                    this.getSelectInput(key).sendKeys(Key.ARROW_DOWN);
                    i++;
                }
            })
            .then(() => this.getSelectInput(key).sendKeys(Key.ENTER))
            .then(() => TimeHelper.waitForGroupsChange(this.getTableRowsCount(key), count));
    }

    deleteFirstItem(key: string) {
        let count;
        return this.getTableRowsCount(key)
            .then((num) => count = num)
            .then(() => this.getFistRowButton(key).click())
            .then(() => TimeHelper.waitForGroupsChange(this.getTableRowsCount(key), count));
    }
}
