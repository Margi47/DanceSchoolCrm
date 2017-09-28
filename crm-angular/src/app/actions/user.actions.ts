import { Injectable } from '@angular/core';
import { ActionWithPayload } from '../actions/actionWithPayload';
import { UserList } from '../actions/actionWithPayload';
import { GroupList } from '../actions/actionWithPayload';
import { UserGroup } from '../actions/actionWithPayload';
import { AvailableGroupStudents } from '../actions/actionWithPayload';
import { UserListRequest } from '../actions/actionWithPayload';

import { User } from '../models/user';
import { Group } from '../models/group';

@Injectable()
export class UserActions {
    static LOAD_USERS = '[User] Load Users';
    loadUsers(page: number, filter: string): ActionWithPayload<UserListRequest> {
        return {
            type: UserActions.LOAD_USERS,
            payload: new UserListRequest(page, filter)
        };
    }

    static LOAD_USERS_SUCCESS = '[User] Load Users Success';
    loadUsersSuccess(users: User[], total: number): ActionWithPayload<UserList> {
        return {
            type: UserActions.LOAD_USERS_SUCCESS,
            payload: new UserList ( users, total )
        };
    }

    static LOAD_AVAILABLE_STUDENTS = '[User] Load Available Students';
    loadAvailableStudents(groupId: number, page: number): ActionWithPayload<AvailableGroupStudents> {
        return {
            type: UserActions.LOAD_AVAILABLE_STUDENTS,
            payload: new AvailableGroupStudents(groupId, page)
        };
    }

    static LOAD_AVAILABLE_STUDENTS_SUCCESS = '[User] Load Available Students Success';
    loadAvailableStudentsSuccess(students: User[], total: number): ActionWithPayload<UserList> {
        return {
            type: UserActions.LOAD_AVAILABLE_STUDENTS_SUCCESS,
            payload: new UserList(students, total)
        };
    }

    static LOAD_AVAILABLE_TEACHERS = '[User] Load Available Teachers';
    loadAvailableTeachers(page: number): ActionWithPayload<number> {
        return {
            type: UserActions.LOAD_AVAILABLE_TEACHERS,
            payload: page
        };
    }

    static LOAD_AVAILABLE_TEACHERS_SUCCESS = '[User] Load Available Teachers Success';
    loadAvailableTeachersSuccess(users: User[], total: number): ActionWithPayload<UserList> {
        return {
            type: UserActions.LOAD_AVAILABLE_TEACHERS_SUCCESS,
            payload: new UserList(users,total)
        };
    }

    static GET_USER = '[User] Get User';
    getUser(userId: number): ActionWithPayload<number> {
        return {
            type: UserActions.GET_USER,
            payload: userId
        };
    }

    static GET_USER_SUCCESS = '[User] Get User Success';
    getUserSuccess(user: User): ActionWithPayload<User> {
        return {
            type: UserActions.GET_USER_SUCCESS,
            payload: user
        };
    }

    static SAVE_USER = '[User] Save User';
    saveUser(user: User): ActionWithPayload<User> {
        return {
            type: UserActions.SAVE_USER,
            payload: user
        };
    }

    static CHANGE_USER_SUCCESS = '[User] Change User Success';
    changeUserSuccess(): ActionWithPayload<null> {
        return {
            type: UserActions.CHANGE_USER_SUCCESS,
            payload: null
        };
    }

    static ADD_USER = '[User] Add User';
    addUser(user: User): ActionWithPayload<User> {
        return {
            type: UserActions.ADD_USER,
            payload: user
        };
    }

    static ADD_USER_SUCCESS = '[User] Add User Success';
    addUserSuccess(userId: number): ActionWithPayload<number> {
        return {
            type: UserActions.ADD_USER_SUCCESS,
            payload: userId
        };
    }

    static DELETE_USER = '[User] Delete User';
    deleteUser(userId: number): ActionWithPayload<number> {
        return {
            type: UserActions.DELETE_USER,
            payload: userId
        };
    }

    static LOAD_USER_GROUPS = '[User] Load User Groups';
    loadUserGroups(userId: number): ActionWithPayload<number> {
        return {
            type: UserActions.LOAD_USER_GROUPS,
            payload: userId
        }
    }
    static LOAD_USER_GROUPS_SUCCESS = '[User] Load User Groups Success';
    loadUserGroupsSuccess(groups: Group[]): ActionWithPayload<Group[]> {
        return {
            type: UserActions.LOAD_USER_GROUPS_SUCCESS,
            payload: groups
        }
    }

    static ADD_USER_GROUP = '[User] Add User Group';
    addUserGroup(userId: number, groupId: number): ActionWithPayload<UserGroup> {
        return {
            type: UserActions.ADD_USER_GROUP,
            payload: new UserGroup(groupId, userId)
        }
    }

    static CHANGE_USER_GROUPS_SUCCESS = '[User] Change User Groups Success';
    changeUserGroupsSuccess(userId: number): ActionWithPayload<number> {
        return {
            type: UserActions.CHANGE_USER_GROUPS_SUCCESS,
            payload: userId
        }
    }

    static REMOVE_USER_GROUP = '[User] Remove User Group';
    removeUserGroup(userId: number, groupId: number): ActionWithPayload<UserGroup> {
        return {
            type: UserActions.REMOVE_USER_GROUP,
            payload: new UserGroup(groupId, userId)
        }
    }

    static CREATE_TEACHER = '[User] Create Teacher';
    createTeacher(user: User): ActionWithPayload<User> {
        return {
            type: UserActions.CREATE_TEACHER,
            payload: user
        };
    }

    static DELETE_TEACHER = '[User] Delete Teacher';
    deleteTeacher(userId: number): ActionWithPayload<number> {
        return {
            type: UserActions.DELETE_TEACHER,
            payload: userId
        };
    }
}
