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
        userListPage.navigateToList()
            .then(() => userListPage.performSearch("na"))//wait
            .then(() => { expect(userListPage.getFirstRowName()).toContain("na") })
            .then(() => userListPage.performSearch("to"))//wait
            .then(() => { expect(userListPage.getFirstRowName()).toContain("to") })
            .then(() => userListPage.performSearch("ndgrenaifnvfdlkv"))//wait
            .then(() => { expect(userListPage.getTableRowsCount()).toEqual(0) });
    })

    it('should validate user inputs', () => {
        userAddPage.navigateToAddForm()
            .then(() => { expect(userAddPage.getSaveButton().isEnabled()).toBeFalsy() })
            .then(() => userAddPage.inputInvalidData())
            .then(() => { expect(userAddPage.getNameValidatorText()).toContain("required") })
            .then(() => { expect(userAddPage.getPhoneValidatorText()).toContain("pattern") })
            .then(() => { expect(userAddPage.getEmailValidatorText()).toContain("pattern") })          
            .then(() => { expect(userAddPage.getAdminInput().isEnabled()).toBeFalsy() })
            .then(() => { expect(userAddPage.getTeacherInput().isEnabled()).toBeFalsy() })
            .then(() => { expect(userAddPage.getSaveButton().isEnabled()).toBeFalsy() });
    })

    it('should add new user', () => {
        userAddPage.navigateToAddForm()
            .then(() => userAddPage.getNameInput().sendKeys("Jack Sparrow"))
            .then(() => userAddPage.getSaveButton().click())
            .then(() => TimeHelper.waitForVisibility(userDetailsPage.getTable()))
            .then(() => userListPage.navigateToList())
            .then(() => userListPage.performSearch("sparrow"))//wait
            .then(() => { expect(userListPage.getTableRowsCount()).toBeGreaterThan(0) })
            .then(() => { expect(userListPage.getFirstRowName()).toContain("jack sparrow") });
    });

    it('should edit user groups', () => {

        userListPage.navigateToList()
            .then(() => userListPage.performSearch("sparrow")) //wait
            .then(() => userListPage.getFirstRowId())
            .then((id) => userDetailsPage.navigateToDetailsForm(id))
            .then(() => userDetailsPage.addNewGroup(1))
            .then(() => { expect(userDetailsPage.getTableRowsCount()).toBe(1) })
            .then(() => browser.sleep(5000))
            .then(() => userDetailsPage.deleteFirstGroup())
            .then(() => { expect(userDetailsPage.getTableRowsCount()).toBe(0) })
    });

    it('should delete user', () => {
        let rowsCount: number;
        userListPage.navigateToList()
            .then(() => userListPage.performSearch("sparrow")) //wait
            .then(() => userListPage.getTableRowsCount())
            .then((num) => rowsCount = num)
            .then(() => userListPage.getFirstRowId())
            .then((id) => userDetailsPage.navigateToDetailsForm(id))
            .then(() => userDetailsPage.getDeleteButton().click())
            .then(() => TimeHelper.waitForVisibility(userListPage.getTable()))
            .then(() => userListPage.performSearch("sparrow")) //wait
            .then(() => { expect(userListPage.getTableRowsCount()).toBe(rowsCount -1) });
    })
});
