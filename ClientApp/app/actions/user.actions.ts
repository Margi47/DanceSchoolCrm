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

    static SAVE_USER_SUCCESS = '[User] Save User Success';
    saveUserSuccess(user): Action {
        return {
            type: UserActions.SAVE_USER_SUCCESS,
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

    static DELETE_USER_SUCCESS = '[User] Delete User Success';
    deleteUserSuccess(user): Action {
        return {
            type: UserActions.DELETE_USER_SUCCESS,
            payload: user
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
}