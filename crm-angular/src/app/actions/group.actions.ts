import { Injectable } from '@angular/core';

import { ActionWithPayload } from '../actions/actionWithPayload';
import { GroupList } from '../actions/actionWithPayload';
import { AvailableGroups } from '../actions/actionWithPayload';
import { UserGroup } from '../actions/actionWithPayload';
import { GroupTeacher } from '../actions/actionWithPayload';
import { ListRequest } from '../actions/actionWithPayload';

import { Group } from '../models/group';
import { User } from '../models/user';
import { Teacher } from '../models/teacher';

@Injectable() 
export class GroupActions {
    static LOAD_GROUPS = '[Group] Load Groups';
    loadGroups(page: number, filter: string): ActionWithPayload<ListRequest> {
        return {
            type: GroupActions.LOAD_GROUPS,
            payload: new ListRequest(page, filter)
        };
    }

    static LOAD_GROUPS_SUCCESS = '[Group] Load Groups Success';
    loadGroupsSuccess(groups: Group[], total: number): ActionWithPayload<GroupList> {
        return {
            type: GroupActions.LOAD_GROUPS_SUCCESS,
            payload: new GroupList(groups, total)
        };
    }

    static GET_GROUP = '[Group] Get Group';
    getGroup(groupId): ActionWithPayload<number> {
        return {
            type: GroupActions.GET_GROUP,
            payload: groupId
        };
    }

    static GET_GROUP_SUCCESS = '[Group] Get Group Success';
    getGroupSuccess(group: Group): ActionWithPayload<Group> {
        return {
            type: GroupActions.GET_GROUP_SUCCESS,
            payload: group
        };
    }

    static LOAD_AVAILABLE_USER_GROUPS = '[Group] Load Available User Groups';
    loadAvailableUserGroups(userId: number, page: number, filter: string): ActionWithPayload<AvailableGroups> {
        return {
            type: GroupActions.LOAD_AVAILABLE_USER_GROUPS,
            payload: new AvailableGroups(userId, page, filter)
        };
    }

    static LOAD_AVAILABLE_USER_GROUPS_SUCCESS = '[Group] Load Available User Groups Success';
    loadAvailableUserGroupsSuccess(groups: Group[], total: number): ActionWithPayload<GroupList> {
        return {
            type: GroupActions.LOAD_AVAILABLE_USER_GROUPS_SUCCESS,
            payload: new GroupList(groups, total)
        };
    }

    static LOAD_AVAILABLE_TEACHER_GROUPS = '[Group] Load Available Teacher Groups';
    loadAvailableTeacherGroups(teacherId: number, page: number, filter: string): ActionWithPayload<AvailableGroups> {
        return {
            type: GroupActions.LOAD_AVAILABLE_TEACHER_GROUPS,
            payload: new AvailableGroups(teacherId, page, filter)
        };
    }

    static LOAD_AVAILABLE_TEACHER_GROUPS_SUCCESS = '[Group] Load Available Teacher Groups Success';
    loadAvailableTeacherGroupsSuccess(groups: Group[], total: number): ActionWithPayload<GroupList> {
        return {
            type: GroupActions.LOAD_AVAILABLE_TEACHER_GROUPS_SUCCESS,
            payload: new GroupList(groups, total)
        };
    }

    static SAVE_GROUP = '[Group] Save Group';
    saveGroup(group: Group): ActionWithPayload<Group> {
        return {
            type: GroupActions.SAVE_GROUP,
            payload: group
        };
    }

    static CHANGE_GROUP_SUCCESS = '[Group] Change Group Success';
    changeGroupSuccess(): ActionWithPayload<null> {
        return {
            type: GroupActions.CHANGE_GROUP_SUCCESS,
            payload: null
        };
    }

    static ADD_GROUP = '[Group] Add Group';
    addGroup(group: Group): ActionWithPayload<Group> {
        return {
            type: GroupActions.ADD_GROUP,
            payload: group
        };
    }

    static ADD_GROUP_SUCCESS = '[Group] Add Group Success';
    addGroupSuccess(groupId: number): ActionWithPayload<number> {
        return {
            type: GroupActions.ADD_GROUP_SUCCESS,
            payload: groupId
        };
    }

    static DELETE_GROUP = '[Group] Delete Group';
    deleteGroup(groupId: number): ActionWithPayload<number> {
        return {
            type: GroupActions.DELETE_GROUP,
            payload: groupId
        };
    }

    static LOAD_STUDENTS = '[Group] Load Group Students';
    loadStudents(groupId: number): ActionWithPayload<number> {
        return {
            type: GroupActions.LOAD_STUDENTS,
            payload: groupId
        };
    }

    static LOAD_STUDENTS_SUCCESS = '[Group] Load Group Students Success';
    loadStudentsSuccess(users: User[]): ActionWithPayload<User[]> {
        return {
            type: GroupActions.LOAD_STUDENTS_SUCCESS,
            payload: users
        };
    }

    static ADD_STUDENT = '[Group] Add Group Student';
    addGroupStudent(groupId: number, userId: number): ActionWithPayload<UserGroup> {
        console.log(userId + "from action");
        return {
            type: GroupActions.ADD_STUDENT,
            payload: new UserGroup(groupId, userId)
        }
    }

    static REMOVE_STUDENT = '[Group] Remove Student';
    removeStudent(groupId: number, userId: number): ActionWithPayload<UserGroup> {
        return {
            type: GroupActions.REMOVE_STUDENT,
            payload: new UserGroup(groupId, userId)
        };
    }

    static CHANGE_GROUP_STUDENTS_SUCCESS = '[Group] Change Group Students Success';
    changeGroupStudentsSuccess(groupId: number): ActionWithPayload<number> {
        return {
            type: GroupActions.CHANGE_GROUP_STUDENTS_SUCCESS,
            payload: groupId
        }
    }

    static LOAD_TEACHERS = '[Group] Load Group Teachers';
    loadTeaches(groupId: number): ActionWithPayload<number> {
        return {
            type: GroupActions.LOAD_TEACHERS,
            payload: groupId
        };
    }

    static LOAD_TEACHERS_SUCCESS = '[Group] Load Group Teachers Success';
    loadTeachesSuccess(teachers: Teacher[]): ActionWithPayload<Teacher[]> {
        return {
            type: GroupActions.LOAD_TEACHERS_SUCCESS,
            payload: teachers
        };
    }

    static ADD_TEACHER = '[Group] Add Group Teacher';
    addGroupTeacher(groupId: number, teacherId: number): ActionWithPayload<GroupTeacher> {
        return {
            type: GroupActions.ADD_TEACHER,
            payload: new GroupTeacher(groupId, teacherId)
        }
    }

    static REMOVE_TEACHER = '[Group] Remove Teacher';
    removeTeacher(groupId: number, teacherId: number): ActionWithPayload<GroupTeacher> {
        return {
            type: GroupActions.REMOVE_TEACHER,
            payload: new GroupTeacher(groupId, teacherId)
        };
    }

    static CHANGE_GROUP_TEACHERS_SUCCESS = '[Group] Change Group Teachers Success';
    changeGroupTeachersSuccess(groupId: number): ActionWithPayload<number> {
        return {
            type: GroupActions.CHANGE_GROUP_TEACHERS_SUCCESS,
            payload: groupId
        }
    }
}
