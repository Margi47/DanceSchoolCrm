import { Injectable } from '@angular/core';

import { Group } from './group';
import { GROUPS } from './mock-groups';

@Injectable()
export class GroupService {
    getGroups(): Promise<Group[]> {
        return Promise.resolve(GROUPS);
    }

    getGroup(id: number): Promise<Group> {
        return this.getGroups()
            .then(groups => groups.find(group => group.id === id));
    }

    addGroup(group: Group): void {
        GROUPS.push(group);
    }

    deleteGroup(group: Group): void {
        GROUPS.splice(GROUPS.indexOf(group), 1);
    }
}