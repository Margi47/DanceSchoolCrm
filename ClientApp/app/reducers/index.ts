import '@ngrx/core/add/operator/select';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';

import groupListReducer, * as fromGroupList from './group-list';
import groupReducer, * as fromGroup from './group';
import userListReducer, * as fromUserList from './user-list';
import userReducer, * as fromUser from './user';
import teacherListReducer, * as fromTeacherList from './teacher-list';
import teacherReducer, * as fromTeacher from './teacher';

export interface AppState {
    groups: fromGroupList.GroupListState;
    group: fromGroup.GroupState;
    users: fromUserList.UserListState;
    user: fromUser.UserState;
    teachers: fromTeacherList.TeacherListState;
    teacher: fromTeacher.TeacherState;
};

export default compose(combineReducers)({
    groups: groupListReducer,
    group: groupReducer,
    users: userListReducer,
    user: userReducer,
    teachers: teacherListReducer,
    teacher: teacherReducer
});