import { UserList } from './userList.po';
import { UserAdd } from './userAdd.po';
import { browser } from 'protractor';


describe('Users Page', () => {

    const userListPage: UserList = new UserList();
    const userAddPage: UserAdd = new UserAdd();

    it('should accept search input and implement search', () => {
        userListPage.navigateToList();

        userListPage.getTableSearch().sendKeys("na");
        expect(userListPage.getFirstRowName()).toContain("na");

        userListPage.getTableSearch().clear();
        userListPage.getTableSearch().sendKeys("to");
        expect(userListPage.getFirstRowName()).toContain("to");

        userListPage.getTableSearch().clear();
        userListPage.getTableSearch().sendKeys("ndgrenaifnvfdlkv");
        expect(userListPage.getTableRowsCount()).toEqual(0);
    })

    it('should validate user inputs', () => {
        userAddPage.navigateToAddForm();

        userAddPage.getNameInput().sendKeys("abc")
            .then(() => userAddPage.getNameInput().clear());
        //browser.pause();
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
            .then(() => userListPage.navigateToList())
            .then(() => userListPage.getTableSearch().sendKeys("sparrow"))
            .then(() => { expect(userListPage.getFirstRowName()).toContain("jack sparrow"); })
    });
});
