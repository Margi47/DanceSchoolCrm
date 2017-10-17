import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';


export class GroupAddPO {

    navigateToAddForm(): promise.Promise<any> {
        return browser.get('/groupadd');
    }

    getForm(): ElementFinder {
        return element(by.tagName('form'));
    }

    getNameInput(): ElementFinder {
        return this.getForm().element(by.id('nameInput'))
            .element(by.tagName('input'));
    }

    getNameValidatorText(): promise.Promise<string> {
        return this.getForm().element(by.id('nameInput'))
            .element(by.tagName('form-validation')).getText();
    }

    getDescriptionInput(): ElementFinder {
        return this.getForm().element(by.id('descriptionInput'))
            .element(by.tagName('input'));
    }

    getDescriptionValidatorText(): promise.Promise<string> {
        return this.getForm().element(by.id('descriptionInput'))
            .element(by.tagName('form-validation')).getText();
    }

    getSaveButton(): ElementFinder {
        return this.getForm().element(by.id('saveButton'));
    }

    inputInvalidData() {
        return this.getNameInput().sendKeys("")
            .then(() => this.getDescriptionInput().sendKeys("abc"));
    }
}
