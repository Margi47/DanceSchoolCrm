import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { NgxPaginationModule } from 'ngx-pagination';
import { SelectModule } from 'ngx-paged-select';

import { GroupsComponent } from './groups.component';
import { GroupListComponent } from './group-list.component';
import { GroupDetailComponent } from './group-detail.component';
import { GroupDetailFormComponent } from './group-detail-form.component';
import { GroupAddComponent } from './group-add.component';
import { GroupAddFormComponent } from './group-add-form.component';

import { GroupService } from '../../services/group.service';
import { GroupActions } from '../../actions/group.actions';
import { GroupEffects } from '../../effects/group.effects';

@NgModule({
    imports: [
        SharedModule,
        NgxPaginationModule,
        EffectsModule.forFeature([GroupEffects]),
        SelectModule
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
