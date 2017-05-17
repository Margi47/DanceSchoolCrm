import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Group } from '../models/group';
import { User } from '../models/user';
import { Teacher } from '../models/teacher';

@Injectable()
export class GroupService {
    private groupsUrl = 'api/groups';
    private groupUserUrl = 'api/groupuser';
    private groupTeacherUrl = 'api/groupteacher';

    constructor(private http: Http) { }

    getGroups(): Observable<Group[]> {
        return this.http.get(this.groupsUrl)
            .map(response => response.json());
    }

    getGroup(id: number): Observable<Group> {
        return this.http.get(`${this.groupsUrl}/${id}`)
            .map(response => response.json());
    }

    getAddingGroups(id: number): Observable<Group[]> {
        return this.http.get(`${this.groupsUrl}/${id}/available`)
            .map(response => response.json());
    }

    addGroup(group: Group): Observable<void> {
        var body = JSON.stringify(group);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });


        return this.http.post(this.groupsUrl, body, options)
            .map(response => response.json())
            .mergeMap(g => {
                console.log(group);
                if (group.teachers.length > 0) {
                    return this.addTeachers(g.id, group.teachers.map(t => t.id)).map(x => null);
                }
                return Observable.of(null);
            });
    }

    deleteGroup(group: Group): Observable<void> {
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(`${this.groupsUrl}/${group.id}`, headers)
            .map(response => null);
    }

    update(groupData: Group): Observable<void> {
        var body = JSON.stringify(groupData);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        console.log('before update');
        return this.http.put(`${this.groupsUrl}/${groupData.id}`, body, options)
            .map(response => null);
    }

    getStudents(groupId: number): Observable<User[]> {
        return this.http.get(`${this.groupUserUrl}/${groupId}/users`)
            .map(response => response.json());
    }

    addStudent(groupId: number, userId: number): Observable<number> {
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        console.log(groupId);
        return this.http.post(`${this.groupUserUrl}/${userId}/${groupId}`, options)
            .map(response => groupId);
    }

    removeStudent(groupId: number, userId: number): Observable<number> {
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(`${this.groupUserUrl}/${userId}/${groupId}`, headers)
            .map(response => groupId);
    }

    getTeachers(groupId: number): Observable<Teacher[]> {
        return this.http.get(`${this.groupTeacherUrl}/${groupId}/teachers`)
            .map(response => response.json());
    }

    addTeachers(groupId: number, teachers: number[]): Observable<number> {
        console.log("adding teacher" + groupId);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var body = JSON.stringify(teachers);
        console.log(body);
        return this.http.post(`${this.groupTeacherUrl}/${groupId}/teachers`, body, options)
            .map(response => groupId);
    }

    removeTeacher(groupId: number, teacherId: number): Observable<number> {
        console.log(teacherId);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(`${this.groupTeacherUrl}/${groupId}/${teacherId}`, headers)
            .map(response => groupId);
    }
}