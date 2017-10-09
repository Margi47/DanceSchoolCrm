import { ListPO } from './po/list.po';
import { GroupAddPO } from './po/group-add.po';
import { GroupDetailsPO, Keys } from './po/group-details.po';
import { TimeHelper } from './helpers/time.helper';
import { browser, Key, protractor } from 'protractor';


describe('Group Page', () => {

    const groupListPage: ListPO = new ListPO("/groups");
    const groupAddPage: GroupAddPO = new GroupAddPO();
    const groupDetailsPage: GroupDetailsPO = new GroupDetailsPO();


    it('should accept group search input and implement search', () => {
        groupListPage.navigateToList()
            .then(() => groupListPage.performSearch("hu"))//wait
            .then(() => { expect(groupListPage.getFirstRowName()).toContain("hu") })
            .then(() => groupListPage.performSearch("wcs"))//wait
            .then(() => { expect(groupListPage.getFirstRowName()).toContain("wcs") })
            .then(() => groupListPage.performSearch("ndgrenaifnvfdlkv"))//wait
            .then(() => { expect(groupListPage.getTableRowsCount()).toEqual(0) });
    })

    it('should validate group inputs', () => {
        groupAddPage.navigateToAddForm()
            .then(() => { expect(groupAddPage.getSaveButton().isEnabled()).toBeFalsy() })
            .then(() => groupAddPage.inputInvalidData())
            .then(() => browser.sleep(3000))
            .then(() => { expect(groupAddPage.getNameValidatorText()).toContain("required") })
            .then(() => { expect(groupAddPage.getSaveButton().isEnabled()).toBeFalsy() });
    })

    it('should add new group', () => {
        var currentUrl;
        groupAddPage.navigateToAddForm()
            .then(() => browser.getCurrentUrl())
            .then((url) => currentUrl = url)
            .then(() => groupAddPage.getNameInput().sendKeys("Group for all"))
            .then(() => groupAddPage.getSaveButton().click())
            .then(() => TimeHelper.waitForUrlChange(currentUrl))
            .then(() => groupListPage.navigateToList())
            .then(() => groupListPage.performSearch("all"))//wait
            .then(() => { expect(groupListPage.getTableRowsCount()).toBeGreaterThan(0) })
            .then(() => { expect(groupListPage.getFirstRowName()).toContain("group for all") });
    });

    it('should edit group teachers', () => {
        groupListPage.navigateToList()
            .then(() => groupListPage.performSearch("all")) //wait
            .then(() => groupListPage.getFirstRowId())
            .then((id) => groupDetailsPage.navigateToDetailsForm(id))
            .then(() => groupDetailsPage.addNewItem(Keys.teachers, 1))
            .then(() => { expect(groupDetailsPage.getTableRowsCount(Keys.teachers)).toBe(1) })
            .then(() => groupDetailsPage.deleteFirstItem(Keys.teachers))
            .then(() => { expect(groupDetailsPage.getTableRowsCount(Keys.teachers)).toBe(0) })
    });

    it('should edit group students', () => {
        groupListPage.navigateToList()
            .then(() => groupListPage.performSearch("all")) //wait
            .then(() => groupListPage.getFirstRowId())
            .then((id) => groupDetailsPage.navigateToDetailsForm(id))
            .then(() => groupDetailsPage.addNewItem(Keys.students, 1))
            .then(() => { expect(groupDetailsPage.getTableRowsCount(Keys.students)).toBe(1) })
            .then(() => groupDetailsPage.deleteFirstItem(Keys.students))
            .then(() => { expect(groupDetailsPage.getTableRowsCount(Keys.students)).toBe(0) })
    });

    it('should delete group', () => {
        let currentUrl: string;
        let rowsCount: number;
        groupListPage.navigateToList()
            .then(() => groupListPage.performSearch("all")) //wait
            .then(() => groupListPage.getTableRowsCount())
            .then((num) => rowsCount = num)
            .then(() => groupListPage.getFirstRowId())
            .then((id) => groupDetailsPage.navigateToDetailsForm(id))
            .then(() => browser.getCurrentUrl())
            .then((url) => currentUrl = url)
            .then(() => groupDetailsPage.getDeleteButton().click())
            .then(() => browser.sleep(0))
            .then(() => TimeHelper.waitForUrlChange(currentUrl))
            .then(() => groupListPage.performSearch("all")) //wait
            .then(() => { expect(groupListPage.getTableRowsCount()).toBe(rowsCount -1) });
    })
});
