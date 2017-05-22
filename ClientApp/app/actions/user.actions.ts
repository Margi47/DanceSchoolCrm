import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { User } from '../models/user';

@Injectable()
export class UserActions {
    static LOAD_USERS = '[User] Load Users';
    loadUsers(): Action {
        return {
            type: UserActions.LOAD_USERS
        };
    }

    static LOAD_USERS_SUCCESS = '[User] Load Users Success';
    loadUsersSuccess(users): Action {
        return {
            type: UserActions.LOAD_USERS_SUCCESS,
            payload: users
        };
    }

    static LOAD_AVAILABLE_STUDENTS = '[Group] Load Available Students';
    loadAvailableStudents(group): Action {
        return {
            type: UserActions.LOAD_AVAILABLE_STUDENTS,
            payload: group
        };
    }

    static LOAD_AVAILABLE_STUDENTS_SUCCESS = '[Group] Load Available Students Success';
    loadAvailableStudentsSuccess(students): Action {
        return {
            type: UserActions.LOAD_AVAILABLE_STUDENTS_SUCCESS,
            payload: students
        };
    }

    static GET_USER = '[User] Get User';
    getUser(id): Action {
        return {
            type: UserActions.GET_USER,
            payload: id
        };
    }

    static GET_USER_SUCCESS = '[User] Get User Success';
    getUserSuccess(user): Action {
        console.log(user);
        return {
            type: UserActions.GET_USER_SUCCESS,
            payload: user
        };
    }

    static SAVE_USER = '[User] Save User';
    saveUser(user): Action {
        return {
            type: UserActions.SAVE_USER,
            payload: user
        };
    }

    static ADD_USER = '[User] Add User';
    addUser(user): Action {
        return {
            type: UserActions.ADD_USER,
            payload: user
        };
    }

    static ADD_USER_SUCCESS = '[User] Add User Success';
    addUserSuccess(user): Action {
        return {
            type: UserActions.ADD_USER_SUCCESS,
            payload: user
        };
    }

    static DELETE_USER = '[User] Delete User';
    deleteUser(id): Action {
        return {
            type: UserActions.DELETE_USER,
            payload: id
        };
    }

    static LOAD_USER_GROUPS = '[User] Load User Groups';
    loadUserGroups(id): Action {
        return {
            type: UserActions.LOAD_USER_GROUPS,
            payload: id
        }
    }
    static LOAD_USER_GROUPS_SUCCESS = '[User] Load User Groups Success';
    loadUserGroupsSuccess(groups): Action {
        return {
            type: UserActions.LOAD_USER_GROUPS_SUCCESS,
            payload: groups
        }
    }

    static ADD_USER_GROUP = '[User] Add User Group';
    addUserGroup(userId, groupId): Action {
        console.log(userId + "from action");
        return {
            type: UserActions.ADD_USER_GROUP,
            payload: { user: userId, group: groupId },
        }
    }

    static CHANGE_USER_GROUPS_SUCCESS = '[User] Change User Groups Success';
    changeUserGroupsSuccess(userId): Action {
        console.log(userId + "from action");
        return {
            type: UserActions.CHANGE_USER_GROUPS_SUCCESS,
            payload: userId
        }
    }

    static REMOVE_USER_GROUP = '[User] Remove User Group';
    removeUserGroup(userId, groupId): Action {
        console.log(userId + "from action");
        return {
            type: UserActions.REMOVE_USER_GROUP,
            payload: { user: userId, group: groupId },
        }
    }

    static CREATE_TEACHER = '[User] Create Teacher';
    createTeacher(user): Action {
        return {
            type: UserActions.CREATE_TEACHER,
            payload: user
        };
    }

    static DELETE_TEACHER = '[User] Delete Teacher';
    deleteTeacher(id): Action {
        return {
            type: UserActions.DELETE_TEACHER,
            payload: id
        };
    }
}