import { browser, by, element, promise, ElementFinder, ElementArrayFinder, protractor,  ExpectedConditions, Key} from 'protractor';
import {TimeHelper} from '../helpers/time.helper';

export class TeacherDetailsPO {

    navigateToDetailsForm(id: string): promise.Promise<any> {
        return browser.get(`/teacherdetail/${id}`).then(() => TimeHelper.waitForVisibility(this.getTable()));
    }

    getGroupSelect(): ElementFinder {
        return element(by.tagName('ngx-paged-select'));
    }

    getGroupSelectInput(): ElementFinder {
        return this.getGroupSelect().element(by.tagName('input'));
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
        let count;
        return this.getTableRowsCount()
            .then((num) => count = num)
            .then(() => this.getAddButton().click())
            .then(() => this.getGroupSelect().click())
            .then(() => {
                let i = 0;
                while (i < index) {
                    this.getGroupSelectInput().sendKeys(Key.ARROW_DOWN);
                    i++;
                }
            })
            .then(() => this.getGroupSelectInput().sendKeys(Key.ENTER))
            .then(() => TimeHelper.waitForGroupsChange(this.getTableRowsCount(), count));
    }

    deleteFirstGroup() {
        let count;
        return this.getTableRowsCount()
            .then((num) => count = num)
            .then(() => this.getFistRowButton().click())
            .then(() => TimeHelper.waitForGroupsChange(this.getTableRowsCount(), count));
    }
}
