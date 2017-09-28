import { Injectable } from '@angular/core';

import { ActionWithPayload } from '../actions/actionWithPayload';
import { TeacherList } from '../actions/actionWithPayload';
import { AvailableGroupTeachers } from '../actions/actionWithPayload';
import { GroupTeacher } from '../actions/actionWithPayload';
import { ListRequest } from '../actions/actionWithPayload';

import { Teacher } from '../models/teacher';
import { Group } from '../models/group';

@Injectable() 
export class TeacherActions {
    static LOAD_ALL_TEACHERS = '[Teacher] Load All Teachers';
    loadAllTeachers(page: number, filter: string): ActionWithPayload<ListRequest> {
        return {
            type: TeacherActions.LOAD_ALL_TEACHERS,
            payload: new ListRequest(page, filter)
        };
    }

    static LOAD_ALL_TEACHERS_SUCCESS = '[Teacher] Load All Teachers Success';
    loadAllTeachersSuccess(teachers: Teacher[], total: number, filter: string): ActionWithPayload<TeacherList> {
        return {
            type: TeacherActions.LOAD_ALL_TEACHERS_SUCCESS,
            payload: new TeacherList(teachers, total, filter)
        };
    }

    static LOAD_AVAILABLE_TEACHERS = '[Teacher] Load Available Teachers';
    loadAvailableTeachers(groupId: number, page: number, filter: string): ActionWithPayload<AvailableGroupTeachers> {
        return {
            type: TeacherActions.LOAD_AVAILABLE_TEACHERS,
            payload: new AvailableGroupTeachers(groupId, page, filter)
        };
    }

    static LOAD_AVAILABLE_TEACHERS_SUCCESS = '[Teacher] Load Available Teachers Success';
    loadAvailableTeachersSuccess(teachers: Teacher[], total: number, filter: string): ActionWithPayload<TeacherList> {
        return {
            type: TeacherActions.LOAD_AVAILABLE_TEACHERS_SUCCESS,
            payload: new TeacherList(teachers, total, filter)
        };
    }

    static GET_TEACHER = '[Teacher] Get Teacher';
    getTeacher(id: number): ActionWithPayload<number> {
        return {
            type: TeacherActions.GET_TEACHER,
            payload: id
        };
    }

    static GET_TEACHER_SUCCESS = '[Teacher] Get Teacher Success';
    getTeacherSuccess(teacher: Teacher): ActionWithPayload<Teacher> {
        return {
            type: TeacherActions.GET_TEACHER_SUCCESS,
            payload: teacher
        };
    }

    static ADD_TEACHER = '[Teacher] Add Teacher';
    addTeacher(teacher: Teacher): ActionWithPayload<Teacher> {
        return {
            type: TeacherActions.ADD_TEACHER,
            payload: teacher
        };
    }

    static DELETE_TEACHER = '[Teacher] Delete Teacher';
    deleteTeacher(teacherId: number): ActionWithPayload<number> {
        return {
            type: TeacherActions.DELETE_TEACHER,
            payload: teacherId
        };
    }

    static CHANGE_TEACHER_SUCCESS = '[Teacher] Change Teacher Success';
    changeTeacherSuccess(): ActionWithPayload<null> {
        return {
            type: TeacherActions.CHANGE_TEACHER_SUCCESS,
            payload: null
        };
    }

    static GET_TEACHER_GROUPS = '[Teacher] Get Teacher Groups';
    getTeacherGroups(teacherId: number): ActionWithPayload<number> {
        return {
            type: TeacherActions.GET_TEACHER_GROUPS,
            payload: teacherId
        };
    }

    static GET_TEACHER_GROUPS_SUCCESS = '[Teacher] Get Teacher Groups Success';
    getTeacherGroupsSuccess(groups: Group[]): ActionWithPayload<Group[]> {
        return {
            type: TeacherActions.GET_TEACHER_GROUPS_SUCCESS,
            payload: groups
        };
    }

    static ADD_TEACHER_GROUP = '[Teacher] Add Teacher Group';
    addTeacherGroup(teacherId: number, groupId: number): ActionWithPayload<GroupTeacher> {
        return {
            type: TeacherActions.ADD_TEACHER_GROUP,
            payload: new GroupTeacher(groupId, teacherId)
        };
    }

    static REMOVE_TEACHER_GROUP = '[Teacher] Remove Teacher Groups';
    removeTeacherGroup(groupId: number, teacherId: number): ActionWithPayload<GroupTeacher> {
        return {
            type: TeacherActions.REMOVE_TEACHER_GROUP,
            payload: new GroupTeacher(groupId, teacherId)
        };
    }

    static CHANGE_TEACHER_GROUPS_SUCCESS = '[Teacher] Change Teacher Groups Success';
    changeTeacherGroupsSuccess(teacherId: number): ActionWithPayload<number> {
        return {
            type: TeacherActions.CHANGE_TEACHER_GROUPS_SUCCESS,
            payload: teacherId
        };
    }
}
