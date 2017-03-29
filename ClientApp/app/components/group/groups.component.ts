import { Component, OnInit } from '@angular/core';
import { Group } from '../../models/group';
import { GroupService } from '../../services/group.service';
import { Router } from '@angular/router'

@Component({
    selector: 'groups',
    template: '<h1>groupsComponent</h1>'
})

export class GroupsComponent {
    groups: Group[];
    selectedGroup: Group

    constructor(private router: Router, private groupService: GroupService) { }

    ngOnInit(): void {
        this.groupService.getGroups().then((g) => this.groups = g)
    }

    addGroup(): void {
        this.router.navigate(['/groupform']);
    }

    showDetails(id: Number): void {
        console.log(id);
        this.router.navigate(['groupdetail', id]);
    }
}