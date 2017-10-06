import { UserList } from './user-list.po';
import { UserAdd } from './user-add.po';
import { UserDetails } from './user-details.po';
import { TimeHelper } from './helpers/time.helper';
import { browser, Key, protractor } from 'protractor';


describe('Users Page', () => {

    const userListPage: UserList = new UserList();
    const userAddPage: UserAdd = new UserAdd();
    const userDetailsPage: UserDetails = new UserDetails();


    it('should accept search input and implement search', () => {
        userListPage.navigateToList();

        userListPage.performSearch("na");
        expect(userListPage.getFirstRowName()).toContain("na");

        userListPage.performSearch("to");
        expect(userListPage.getFirstRowName()).toContain("to");

        userListPage.performSearch("ndgrenaifnvfdlkv");
        expect(userListPage.getTableRowsCount()).toEqual(0);
    })

    it('should validate user inputs', () => {
        userAddPage.navigateToAddForm()
            .then(() => { expect(userAddPage.getSaveButton().isEnabled()).toBeFalsy() });
        browser.pause();
        userAddPage.getNameInput().sendKeys("abc")
            .then(() => userAddPage.getNameInput().clear());
            //.then(() => { expect(userAddPage.getNameValidatorText()).toContain("required") });

        userAddPage.getPhoneInput().sendKeys("abc")
            .then(() => { expect(userAddPage.getPhoneValidatorText()).toContain("pattern") });

        userAddPage.getEmailInput().sendKeys("abc")
            .then(() => { expect(userAddPage.getEmailValidatorText()).toContain("pattern"); });

        expect(userAddPage.getAdminInput().isEnabled()).toBeFalsy();
        expect(userAddPage.getTeacherInput().isEnabled()).toBeFalsy();

        expect(userAddPage.getSaveButton().isEnabled()).toBeFalsy();

    })

    it('should add new user', () => {
        userAddPage.navigateToAddForm();

        userAddPage.getNameInput().sendKeys("Jack Sparrow")
            .then(() => userAddPage.getSaveButton().click())
            .then(() => TimeHelper.waitForVisibility(userDetailsPage.getTable()))
            .then(() => userListPage.navigateToList())
            .then(() => userListPage.performSearch("sparrow"))
            .then(() => { expect(userListPage.getTableRowsCount()).toBeGreaterThan(0) })
            .then(() => { expect(userListPage.getFirstRowName()).toContain("jack sparrow") });
    });

    it('should edit user groups', () => {
        let groupsCount;
        userListPage.navigateToList();

        userListPage.performSearch("sparrow")
            .then(() => userListPage.getFirstRowId())
            .then((id) => userDetailsPage.navigateToDetailsForm(id))
            .then(() => groupsCount = userDetailsPage.getTableRowsCount())
            .then(() => userDetailsPage.getAddButton().click())
            .then(() => userDetailsPage.getSelect().click())
            .then(() => userDetailsPage.getSelectInput().sendKeys(Key.ARROW_DOWN))
            .then(() => userDetailsPage.getSelectInput().sendKeys(Key.ENTER))
            .then(() => TimeHelper.waitForGroupsChange(groupsCount))
            .then(() => { expect(userDetailsPage.getTableRowsCount()).toBe(1) });
    });

    it('should delete user', () => {
        userListPage.navigateToList();

        userListPage.performSearch("sparrow")
            .then(() => userListPage.getFirstRowId())
            .then((id) => userDetailsPage.navigateToDetailsForm(id))
            .then(() => userDetailsPage.getDeleteButton().click())
            .then(() => TimeHelper.waitForVisibility(userListPage.getTable()))
            .then(() => userListPage.performSearch("sparrow"))
            .then(() => { expect(userListPage.getTableRowsCount()).toBe(0) });
    })
});
