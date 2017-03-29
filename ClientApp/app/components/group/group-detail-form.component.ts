import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Group } from '../../models/group';
import { GroupService } from '../../services/group.service';
import 'rxjs/add/operator/switchMap';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'group-detail',
    templateUrl: './group-detail.component.html'
})

export class GroupDetailComponent implements OnInit {
    model: Group;

    constructor(private router: ActivatedRoute,
        private service: GroupService,
        private location: Location) { }

    delete() {
        this.service.deleteGroup(this.model);
        this.goBack();
    }


    ngOnInit(): void {
        this.router.params
            .switchMap((params: Params) => this.service.getGroup(+params['id']))
            .subscribe(group => { console.log(group); this.model = Object.assign({}, group); });
    }

    onSubmit(): void {
        this.service.update(this.model);
        this.goBack();
    }

    goBack(): void {
        this.location.back();
    }
}