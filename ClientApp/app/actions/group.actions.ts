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

    static LOAD_ADDING_GROUPS = '[Group] Load Adding Groups';
    loadAddingGroups(user): Action {
        return {
            type: GroupActions.LOAD_ADDING_GROUPS,
            payload: user
        };
    }

    static LOAD_ADDING_GROUPS_SUCCESS = '[Group] Load Adding Groups Success';
    loadAddingGroupsSuccess(groups): Action {
        return {
            type: GroupActions.LOAD_ADDING_GROUPS_SUCCESS,
            payload: groups
        };
    }

    static SAVE_GROUP = '[Group] Save Group';
    saveGroup(group): Action {
        return {
            type: GroupActions.SAVE_GROUP,
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

    static DELETE_GROUP = '[Group] Delete Group';
    deleteGroup(group): Action {
        return {
            type: GroupActions.DELETE_GROUP,
            payload: group
        };
    }

    static LOAD_STUDENTS = '[Group] Load Group Students';
    loadStudents(groupId): Action {
        return {
            type: GroupActions.LOAD_STUDENTS,
            payload: groupId
        };
    }

    static LOAD_STUDENTS_SUCCESS = '[Group] Load Group Students Success';
    loadStudentsSuccess(users): Action {
        return {
            type: GroupActions.LOAD_STUDENTS_SUCCESS,
            payload: users
        };
    }

    static ADD_STUDENT = '[Group] Add Group Student';
    addGroupStudent(groupId, userId): Action {
        console.log(userId + "from action");
        return {
            type: GroupActions.ADD_STUDENT,
            payload: { group: groupId, user: userId  },
        }
    }

    static REMOVE_STUDENT = '[Group] Remove Student';
    removeStudent(groupId, userId): Action {
        return {
            type: GroupActions.REMOVE_STUDENT,
            payload: { group: groupId, user: userId }
        };
    }

    static LOAD_TEACHERS = '[Group] Load Group Teachers';
    loadTeaches(groupId): Action {
        return {
            type: GroupActions.LOAD_TEACHERS,
            payload: groupId
        };
    }

    static LOAD_TEACHERS_SUCCESS = '[Group] Load Group Teachers Success';
    loadTeachesSuccess(teachers): Action {
        return {
            type: GroupActions.LOAD_TEACHERS_SUCCESS,
            payload: teachers
        };
    }

    static ADD_TEACHERS = '[Group] Add Group Teachers';
    addGroupTeachers(groupId, teachers): Action {
        console.log(teachers + "from action");
        return {
            type: GroupActions.ADD_TEACHERS,
            payload: { group: groupId, teachers: teachers },
        }
    }

    static REMOVE_TEACHER = '[Group] Remove Teacher';
    removeTeacher(groupId, teacherId): Action {
        return {
            type: GroupActions.REMOVE_TEACHER,
            payload: { group: groupId, teacher: teacherId }
        };
    }
}