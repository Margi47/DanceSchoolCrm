import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Teacher } from '../models/teacher';

@Injectable() 
export class TeacherActions {
    static LOAD_TEACHERS = '[Teacher] Load Teachers';
    loadTeachers(): Action {
        return {
            type: TeacherActions.LOAD_TEACHERS
        };
    }

    static LOAD_TEACHERS_SUCCESS = '[Teacher] Load Teachers Success';
    loadTeachersSuccess(teachers): Action {
        return {
            type: TeacherActions.LOAD_TEACHERS_SUCCESS,
            payload: teachers
        };
    }

    static LOAD_ALL_GROUPS = '[Teacher] Load All Groups';
    loadAllGroups(): Action {
        return {
            type: TeacherActions.LOAD_ALL_GROUPS
        };
    }

    static LOAD_ALL_GROUPS_SUCCESS = '[Teacher] Load All Groups Success';
    loadAllGroupsSuccess(groups): Action {
        return {
            type: TeacherActions.LOAD_ALL_GROUPS_SUCCESS,
            payload: groups
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