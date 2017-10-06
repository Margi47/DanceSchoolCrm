import { browser, protractor, ElementFinder} from 'protractor';
import { UserDetails } from '../user-details.po';

const userDetailsPage: UserDetails = new UserDetails();

export class TimeHelper {

    static waitForVisibility(element: ElementFinder) {
        return browser.wait(protractor.ExpectedConditions.visibilityOf(element), 5000);
    }

    static waitForGroupsChange(num: number) {
        return browser.wait(() => {
            return userDetailsPage.getTableRowsCount()
                .then((rows) => rows != num)
        }
        , 5000);
    }
}
