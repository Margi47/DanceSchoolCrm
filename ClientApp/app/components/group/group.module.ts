import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { GroupsComponent } from './groups.component';
import { GroupListComponent } from './group-list.component';
import { GroupDetailComponent } from './group-detail.component';
import { GroupDetailFormComponent } from './group-detail-form.component';
import { GroupAddComponent } from './group-add.component';
import { GroupAddFormComponent } from './group-add-form.component';

import reducer from '../../reducers';
import { GroupService } from '../../services/group.service';
import { GroupActions } from '../../actions/group.actions';
import { GroupEffects } from '../../effects/group';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        StoreModule.provideStore(reducer),
        EffectsModule.run(GroupEffects)
    ],
    declarations: [
        GroupsComponent,
        GroupListComponent,
        GroupDetailComponent,
        GroupDetailFormComponent,
        GroupAddComponent,
        GroupAddFormComponent
    ],
    exports: [GroupsComponent],
    providers: [GroupService, GroupActions]
})
export class GroupModule { }