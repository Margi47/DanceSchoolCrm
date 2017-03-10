import { Component } from '@angular/core';

import { Group } from './group';
import { GroupService } from './group.service';
import { Location } from '@angular/common';

@Component({
    selector: 'addgroup-form',
    templateUrl: './group-form.component.html'
})
export class GroupFormComponent {
    model = new Group();

    constructor(private service: GroupService, private location: Location) { }

    onSubmit(): void {
        this.service.addGroup(this.model);
        this.location.back();
    }

    onCancel(): void {
        this.location.back();
    }
}