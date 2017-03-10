import { Component, OnInit } from '@angular/core';
import { Group } from './group';
import { GroupService } from './group.service';
import { Router } from '@angular/router'

@Component({
    selector: 'groups',
    templateUrl: './group-list.component.html'
})

export class GroupListComponent {
    groups: Group[];
    selectedGroup: Group

    constructor(private router: Router, private groupService: GroupService) { }

    ngOnInit(): void {
        this.groupService.getGroups().then((g) => this.groups = g)
    }

    addUser(): void {
       // this.router.navigate(['/userForm']);
    }

    showDetails(id: Number): void {
        //this.router.navigate(['detail', id]);
    }
}