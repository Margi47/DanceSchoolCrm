import { ListPO } from './po/list.po';
import { TeacherAddPO } from './po/teacher-add.po';
import { TeacherDetailsPO } from './po/teacher-details.po';
import { TimeHelper } from './helpers/time.helper';
import { browser, Key, protractor } from 'protractor';


describe('Teacher Page', () => {

    const teacherListPage: ListPO = new ListPO("/teachers");
    const teacherAddPage: TeacherAddPO = new TeacherAddPO();
    const teacherDetailsPage: TeacherDetailsPO = new TeacherDetailsPO();

    let currentUrl: string;
    let name: string;

    it('should accept teacher search input and implement search', () => {
        teacherListPage.navigateToList()
            .then(() => teacherListPage.performSearch("ma"))//wait
            .then(() => { expect(teacherListPage.getFirstRowName()).toContain("ma") })
            .then(() => teacherListPage.performSearch("na"))//wait
            .then(() => { expect(teacherListPage.getFirstRowName()).toContain("na") })
            .then(() => teacherListPage.performSearch("ndgrenaifnvfdlkv"))//wait
            .then(() => { expect(teacherListPage.getTableRowsCount()).toEqual(0) });
    })


    it('should add new teacher', () => {
        teacherAddPage.navigateToAddForm()
            .then(() => browser.getCurrentUrl())
            .then((url) => currentUrl = url)
            .then(() => teacherAddPage.addNewTeacher(1))
            .then(() => teacherAddPage.getNewTeacherName())
            .then((value) => name = value.toLowerCase())
            .then(() => teacherAddPage.getSaveButton().click())
            .then(() => TimeHelper.waitForUrlChange(currentUrl))
            .then(() => teacherListPage.navigateToList())
            .then(() => teacherListPage.performSearch(name))//wait
            .then(() => { expect(teacherListPage.getTableRowsCount()).toBeGreaterThan(0) })
            .then(() => { expect(teacherListPage.getFirstRowName()).toContain(name) });
    });

    it('should edit teacher groups', () => {
        let groupCount: number;
        teacherListPage.navigateToList()
            .then(() => teacherListPage.performSearch(name)) //wait
            .then(() => teacherListPage.getFirstRowId())
            .then((id) => teacherDetailsPage.navigateToDetailsForm(id))
            .then(() => teacherDetailsPage.getTableRowsCount())
            .then((num) => groupCount = num)
            .then(() => teacherDetailsPage.addNewGroup(1))
            .then(() => { expect(teacherDetailsPage.getTableRowsCount()).toBe(groupCount + 1) })
            .then(() => teacherDetailsPage.deleteFirstGroup())
            .then(() => { expect(teacherDetailsPage.getTableRowsCount()).toBe(groupCount) })
    });

    it('should delete teacher', () => {
        let rowsCount: number;
        teacherListPage.navigateToList()
            .then(() => teacherListPage.performSearch(name)) //wait
            .then(() => teacherListPage.getTableRowsCount())
            .then((num) => rowsCount = num)
            .then(() => teacherListPage.getFirstRowId())
            .then((id) => teacherDetailsPage.navigateToDetailsForm(id))
            .then(() => browser.getCurrentUrl())
            .then((url) => currentUrl = url)
            .then(() => teacherDetailsPage.getDeleteButton().click())
            .then(() => browser.sleep(2000))
            .then(() => TimeHelper.waitForUrlChange(currentUrl))
            .then(() => teacherListPage.performSearch(name)) //wait
            .then(() => { expect(teacherListPage.getTableRowsCount()).toBe(rowsCount - 1) });
    })
});
