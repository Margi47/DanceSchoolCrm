import { Action } from '@ngrx/store';
import { User } from '../models/user';
import { Group } from '../models/group';
import { Teacher } from '../models/teacher';
import { NavigationExtras } from '@angular/router';

export interface ActionWithPayload<T> extends Action {
  payload: T;
}
export class ListRequest {
    constructor(public page: number, public filter: string) { }
}

export class UserList {
    constructor( public userList: User[], public total: number){ }
}

export class GroupList {
    constructor(public groupList: Group[], public total: number) { }
}

export class TeacherList {
    constructor(public teacherList: Teacher[], public total: number) { }
}

export class AvailableGroupStudents {
    constructor(public groupId: number, public page: number, public filter: string) { }
}

export class AvailableGroupTeachers {
    constructor(public groupId: number, public page: number, public filter: string) { }
}

export class AvailableGroups {
    constructor(public userId: number, public page: number, public filter: string) { }
}

export class UserGroup {
    constructor(public groupId: number, public userId: number) { }
}

export class GroupTeacher {
    constructor(public groupId: number, public teacherId: number) { }
}

export class ErrorPayload {
    constructor(public code: number, public error: any) { }
}

export class NavigationPayload {
    constructor(public path: any[], public query?: object, public extras?: NavigationExtras) { }
}
