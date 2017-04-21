import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Teacher } from '../models/teacher';

@Injectable() 
export class TeacherActions {
    static LOAD_ALL_TEACHERS = '[Teacher] Load All Teachers';
    loadAllTeachers(): Action {
        return {
            type: TeacherActions.LOAD_ALL_TEACHERS
        };
    }
    static LOAD_ALL_TEACHERS_SUCCESS = '[Teacher] Load All Teachers Success';
    loadAllTeachersSuccess(teachers): Action {
        return {
            type: TeacherActions.LOAD_ALL_TEACHERS_SUCCESS,
            payload: teachers
        };
    }

    static ADD_TEACHER = '[Teacher] Add Teacher';
    addTeacher(teacher): Action {
        return {
            type: TeacherActions.ADD_TEACHER,
            payload: teacher
        };
    }
    static ADD_TEACHER_SUCCESS = '[Teacher] Add Teacher Success';
    addTeacherSuccess(teacher): Action {
        return {
            type: TeacherActions.ADD_TEACHER_SUCCESS,
            payload: teacher
        };
    }

    static ADD_TEACHER_GROUPS = '[Teacher] Add Teacher Groups';
    addTeacherGroups(teacherId, groups): Action {
        return {
            type: TeacherActions.ADD_TEACHER_GROUPS,
            payload: { teacher: teacherId, groups: groups }
        };
    }
    static ADD_TEACHER_GROUPS_SUCCESS = '[Teacher] Add Teacher Groups Success';
    addTeacherGroupsSuccess(groups): Action {
        return {
            type: TeacherActions.ADD_TEACHER_GROUPS_SUCCESS,
            payload: groups
        };
    }

    static REMOVE_TEACHER_GROUP = '[Teacher] Remove Teacher Groups';
    removeTeacherGroup(teacherId, groupId): Action {
        console.log(groupId);
        return {
            type: TeacherActions.REMOVE_TEACHER_GROUP,
            payload: { teacher: teacherId, group: groupId }
        };
    }
    static REMOVE_TEACHER_GROUPS_SUCCESS = '[Teacher] Remove Teacher Groups Success';
    removeTeacherGroupsSuccess(group): Action {
        console.log(group);
        return {
            type: TeacherActions.REMOVE_TEACHER_GROUPS_SUCCESS,
            payload: group
        };
    }

    static GET_TEACHER = '[Teacher] Get Teacher';
    getTeacher(id): Action {
        return {
            type: TeacherActions.GET_TEACHER,
            payload: id
        };
    }

    static GET_TEACHER_SUCCESS = '[Teacher] Get Teacher Success';
    getTeacherSuccess(teacher): Action {
        return {
            type: TeacherActions.GET_TEACHER_SUCCESS,
            payload: teacher
        };
    }

    static GET_TEACHER_GROUPS = '[Teacher] Get Teacher Groups';
    getTeacherGroups(id): Action {
        return {
            type: TeacherActions.GET_TEACHER_GROUPS,
            payload: id
        };
    }

    static GET_TEACHER_GROUPS_SUCCESS = '[Teacher] Get Teacher Groups Success';
    getTeacherGroupsSuccess(groups): Action {
        return {
            type: TeacherActions.GET_TEACHER_GROUPS_SUCCESS,
            payload: groups
        };
    }






    static UPDATE_TEACHER = '[Teacher] Uptade Teacher';
    updateTeacher(teacher): Action {
        return {
            type: TeacherActions.UPDATE_TEACHER,
            payload: teacher
        };
    }

    static UPDATE_TEACHER_SUCCESS = '[Teacher] Update Teacher Success';
    updateTeacherSuccess(teacher): Action {
        return {
            type: TeacherActions.UPDATE_TEACHER_SUCCESS,
            payload: teacher
        };
    }


    static DELETE_TEACHER = '[Teacher] Delete Teacher';
    deleteTeacher(teacher): Action {
        return {
            type: TeacherActions.DELETE_TEACHER,
            payload: teacher
        };
    }

    static DELETE_TEACHER_SUCCESS = '[Teacher] Delete Teacher Success';
    deleteTeacherSuccess(teacher): Action {
        return {
            type: TeacherActions.DELETE_TEACHER_SUCCESS,
            payload: teacher
        };
    }
}