import { browser, protractor, ElementFinder, promise} from 'protractor';

export class TimeHelper {

    static waitForVisibility(element: ElementFinder) {
        return browser.wait(protractor.ExpectedConditions.visibilityOf(element));
    }

    static waitForClickable(element: ElementFinder) {
        return browser.wait(protractor.ExpectedConditions.elementToBeClickable(element));
    }

    static waitForUrlChange(url: string) {
        return browser.wait(() => browser.getCurrentUrl().then((curUrl) => curUrl != url));
    }

    static waitForGroupsChange(expression: promise.Promise<any>, num: number) {
        return browser.wait(() => expression.then((rows) => rows != num));
    }
}
