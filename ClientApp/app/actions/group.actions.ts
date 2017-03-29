import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Group } from '../models/group';

@Injectable() 
export class GroupActions {
    static LOAD_GROUPS = '[Group] Load Groups';
    loadGroups(): Action {
        return {
            type: GroupActions.LOAD_GROUPS
        };
    }

    static LOAD_GROUPS_SUCCESS = '[Group] Load Groups Success';
    loadGroupsSuccess(groups): Action {
        return {
            type: GroupActions.LOAD_GROUPS_SUCCESS,
            payload: groups
        };
    }

    static GET_GROUP = '[Group] Get Group';
    getGroup(id): Action {
        return {
            type: GroupActions.GET_GROUP,
            payload: id
        };
    }

    static GET_GROUP_SUCCESS = '[Group] Get Group Success';
    getGroupSuccess(group): Action {
        return {
            type: GroupActions.GET_GROUP_SUCCESS,
            payload: group
        };
    }

    static RESET_BLANK_GROUP = '[Group] Reset Blank Group';
    resetBlankGroup(): Action {
        return {
            type: GroupActions.RESET_BLANK_GROUP
        };
    }

    static SAVE_GROUP = '[Group] Save Group';
    saveGroup(group): Action {
        return {
            type: GroupActions.SAVE_GROUP,
            payload: group
        };
    }

    static SAVE_GROUP_SUCCESS = '[Group] Save Group Success';
    saveGroupSuccess(group): Action {
        return {
            type: GroupActions.SAVE_GROUP_SUCCESS,
            payload: group
        };
    }

    static ADD_GROUP = '[Group] Add Group';
    addGroup(group): Action {
        return {
            type: GroupActions.ADD_GROUP,
            payload: group
        };
    }

    static ADD_GROUP_SUCCESS = '[Group] Add Group Success';
    addGroupSuccess(group): Action {
        console.log("add from action success"); console.log(group);
        return {
            type: GroupActions.ADD_GROUP_SUCCESS,
            payload: group
        };
    }

    static DELETE_GROUP = '[Group] Delete Group';
    deleteGroup(group): Action {
        return {
            type: GroupActions.DELETE_GROUP,
            payload: group
        };
    }

    static DELETE_GROUP_SUCCESS = '[Group] Delete Group Success';
    deleteGroupSuccess(group): Action {
        return {
            type: GroupActions.DELETE_GROUP_SUCCESS,
            payload: group
        };
    }
}