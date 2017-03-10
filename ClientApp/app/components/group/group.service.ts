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
            .then(groups => {
                var g = groups.find(group => group.id === id);
                return g;
            });
    }

    addGroup(group: Group): void {
        GROUPS.push(group);
    }

    deleteGroup(id: number): void {
        this.getGroup(id).then(group => GROUPS.splice(GROUPS.indexOf(group), 1));
    }

    update(groupData: Group) {
        this.getGroup(groupData.id).then(group => this.deleteGroup(group.id));
        GROUPS.push(groupData);
    }
}