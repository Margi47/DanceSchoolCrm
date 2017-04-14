import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Group } from '../models/group';
import { User } from '../models/user';


@Injectable()
export class GroupService {
    private groupsUrl = 'api/groups';

    constructor(private http: Http) { }

    getGroups(): Observable<Group[]> {
        return this.http.get(this.groupsUrl)
            .map(response => response.json());
    }

    getGroup(id: number): Observable<Group> {
        return this.http.get(`${this.groupsUrl}/${id}`)
            .map(response => response.json());
    }

    addGroup(group: Group): Observable<Group> {
        var body = JSON.stringify(group);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });


        return this.http.post(this.groupsUrl, body, options)
            .map(response => response.json());
    }

    deleteGroup(group: Group): Observable<Group> {
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(`${this.groupsUrl}/${group.id}`, headers)
            .map(response => group);
    }

    update(groupData: Group): Observable<Group> {
        var body = JSON.stringify(groupData);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        console.log('before update');
        return this.http.put(`${this.groupsUrl}/${groupData.id}`, body, options)
            .map(response => groupData);
    }

    getStudents(groupId: number): Observable<User[]> {
        return this.http.get(`${this.groupsUrl}/${groupId}/students`)
            .map(response => response.json());
    }

    addStudent(groupId: number, userId: number): Observable<User> {
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        console.log(groupId);
        return this.http.post(`${this.groupsUrl}/${groupId}/students/${userId}`, options)
            .map(response => response.json());
    }

    removeStudent(groupId: number, userId: number): Observable<number> {
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(`${this.groupsUrl}/${groupId}/students/${userId}`, headers)
            .map(response => userId);
    }
}