import '@ngrx/core/add/operator/select';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';

import groupListReducer, * as fromGroupList from './group-list';
import groupReducer, * as fromGroup from './group';

export interface AppState {
    groups: fromGroupList.GroupListState;
    group: fromGroup.GroupState;
};

export default compose(combineReducers)({
    groups: groupListReducer,
    group: groupReducer
});