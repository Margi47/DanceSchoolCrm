import { browser, by, element, promise, ElementFinder, ElementArrayFinder } from 'protractor';


export class UserAddPO {

    navigateToAddForm(): promise.Promise<any> {
        return browser.get('/useradd');
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

    getPhoneInput(): ElementFinder {
        return this.getForm().element(by.id('phoneInput'))
            .element(by.tagName('input'));
    }

    getPhoneValidatorText(): promise.Promise<string> {
        return this.getForm().element(by.id('phoneInput'))
            .element(by.tagName('form-validation')).getText();
    }

    getEmailInput(): ElementFinder {
        return this.getForm().element(by.id('emailInput'))
            .element(by.tagName('input'));
    }

    getEmailValidatorText(): promise.Promise<string> {
        return this.getForm().element(by.id('emailInput'))
            .element(by.tagName('form-validation')).getText();
    }

    getActiveInput(): ElementFinder {
        return this.getForm().element(by.name('active'));
    }

    getAdminInput(): ElementFinder {
        return this.getForm().element(by.name('admin'));
    }

    getTeacherInput(): ElementFinder {
        return this.getForm().element(by.name('teacher'));
    }

    getSaveButton(): ElementFinder {
        return this.getForm().element(by.id('saveButton'));
    }

    inputInvalidData() {
        return this.getNameInput().sendKeys("")
            .then(() => this.getPhoneInput().sendKeys("abc"))
            .then(() => this.getEmailInput().sendKeys("abc"));
    }
}
