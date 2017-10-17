import { browser, by, element, promise, ElementFinder, ElementArrayFinder, Key } from 'protractor';
import { TimeHelper } from '../helpers/time.helper';


export class TeacherAddPO {

    navigateToAddForm(): promise.Promise<any> {
        return browser.get('/teacheradd');
    }

    getForm(): ElementFinder {
        return element(by.tagName('form'));
    }

    getNameSelect(): ElementFinder {
        return this.getForm().element(by.tagName('ngx-paged-select'));
    }

    getSelectInput(): ElementFinder {
        return this.getNameSelect().element(by.tagName('input'));
    }

    getSaveButton(): ElementFinder {
        return this.getForm().element(by.id('saveButton'));
    }

    addNewTeacher(index: number) {
        return this.getNameSelect().click()
            .then(() => {
                let i = 0;
                while (i < index) {
                    this.getSelectInput().sendKeys(Key.ARROW_DOWN);
                    i++;
                }
            })
            .then(() => this.getSelectInput().sendKeys(Key.ENTER))
            .then(() => TimeHelper.waitForClickable(this.getSaveButton()));
    }

    getNewTeacherName(): promise.Promise<string> {

        return this.getForm().element(by.id('hiddenInput')).getAttribute("value");
    }
}
