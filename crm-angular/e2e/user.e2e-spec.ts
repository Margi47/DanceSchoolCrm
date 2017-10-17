import { ListPO } from './po/list.po';
import { UserAddPO } from './po/user-add.po';
import { UserDetailsPO } from './po/user-details.po';
import { TimeHelper } from './helpers/time.helper';
import { browser, Key, protractor } from 'protractor';


describe('Users Page', () => {

    const userListPage: ListPO = new ListPO("/users");
    const userAddPage: UserAddPO = new UserAddPO();
    const userDetailsPage: UserDetailsPO = new UserDetailsPO();


    it('should accept user search input and implement search', () => {
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
        let currentUrl;
        userAddPage.navigateToAddForm()
            .then(() => browser.getCurrentUrl())
            .then((url) => currentUrl = url)
            .then(() => userAddPage.getNameInput().sendKeys("Jack Sparrow"))
            .then(() => userAddPage.getSaveButton().click())
            .then(() => TimeHelper.waitForUrlChange(currentUrl))
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
            .then(() => userDetailsPage.deleteFirstGroup())
            .then(() => { expect(userDetailsPage.getTableRowsCount()).toBe(0) })
    });

    it('should delete user', () => {
        let currentUrl;
        let rowsCount: number;
        userListPage.navigateToList()
            .then(() => userListPage.performSearch("sparrow")) //wait
            .then(() => userListPage.getTableRowsCount())
            .then((num) => rowsCount = num)
            .then(() => userListPage.getFirstRowId())
            .then((id) => userDetailsPage.navigateToDetailsForm(id))
            .then(() => browser.getCurrentUrl())
            .then((url) => currentUrl = url)
            .then(() => userDetailsPage.getDeleteButton().click())
            .then(() => browser.sleep(2000))
            .then(() => TimeHelper.waitForUrlChange(currentUrl))
            .then(() => userListPage.performSearch("sparrow")) //wait
            .then(() => { expect(userListPage.getTableRowsCount()).toBe(rowsCount -1) });
    })
});
