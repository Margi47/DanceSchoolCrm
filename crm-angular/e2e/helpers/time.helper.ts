import { browser, protractor, ElementFinder, promise} from 'protractor';
import { UserDetails } from '../po/user-details.po';

const userDetailsPage: UserDetails = new UserDetails();

export class TimeHelper {

    static waitForVisibility(element: ElementFinder) {
        return browser.wait(protractor.ExpectedConditions.visibilityOf(element), 5000);
    }

    static waitForUrlChange(url: string) {
        return browser.wait(() => browser.getCurrentUrl().then((curUrl) => curUrl != url), 5000);
    }

    static waitForGroupsChange(expression: promise.Promise<any>, num: number) {
        return browser.wait(() => expression.then((rows) => rows != num), 5000);
    }
}
