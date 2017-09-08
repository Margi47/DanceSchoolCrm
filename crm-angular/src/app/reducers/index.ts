import { compose } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';
import { ActionReducerMap } from '@ngrx/store';

import groupListReducer, * as fromGroupList from './group-list.reducer';
import groupReducer, * as fromGroup from './group.reducer';
import userListReducer, * as fromUserList from './user-list.reducer';
import userReducer, * as fromUser from './user.reducer';
import teacherListReducer, * as fromTeacherList from './teacher-list.reducer';
import teacherReducer, * as fromTeacher from './teacher.reducer';
import errorMessageReducer, * as fromErrorMessage from './error-message.reducer';
import formErrorReducer, * as fromFormError from './form-error.reducer';

export interface AppState {
    groups: fromGroupList.GroupListState;
    group: fromGroup.GroupState;
    users: fromUserList.UserListState;
    user: fromUser.UserState;
    teachers: fromTeacherList.TeacherListState;
    teacher: fromTeacher.TeacherState;
    errorMessage: fromErrorMessage.ErrorMessageState;
    errorFields: fromFormError.FormErrorState;
};

export const reducers: ActionReducerMap<AppState> = {
    groups: groupListReducer,
    group: groupReducer,
    users: userListReducer,
    user: userReducer,
    teachers: teacherListReducer,
    teacher: teacherReducer,
    errorMessage: errorMessageReducer,
    errorFields: formErrorReducer
};
