import { Injectable, Inject } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Group } from '../models/group';
import { User } from '../models/user';
import { Teacher } from '../models/teacher';

@Injectable()
export class GroupService {
    private groupsUrl;
    private groupUserUrl;
    private groupTeacherUrl;

    constructor(private http: Http) {
        this.groupsUrl = environment.url + '/api/groups';
        this.groupUserUrl = environment.url + '/api/groupuser';
        this.groupTeacherUrl = environment.url + '/api/groupteacher';
    }

    getGroups(page: number, filter: string): Observable<any> {
        return this.http.get(`${this.groupsUrl}?filter=${filter}&page=${page}&pagesize=10`)
            .map(response => {
                const data = response.json();
                data.filter = filter;
                return data;
            });
    }

    getGroup(id: number): Observable<Group> {
        return this.http.get(`${this.groupsUrl}/${id}`)
            .map(response => response.json());
    }

    getAvailableUserGroups(id: number, page: number, filter: string): Observable<any> {
        return this.http.get(`${this.groupUserUrl}/${id}/groups/available?filter=${filter}&page=${page}&pagesize=10`)
            .map(response => {
                const data = response.json();
                data.filter = filter;
                return data;
            });
    }

    getAvailableTeacherGroups(id: number, page: number, filter: string): Observable<any> {
        return this.http.get(`${this.groupTeacherUrl}/${id}/groups/available?filter=${filter}&page=${page}&pagesize=10`)
            .map(response => {
                const data = response.json();
                data.filter = filter;
                return data;
            });
    }

    addGroup(group: Group): Observable<number> {
        var body = JSON.stringify(group);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.groupsUrl, body, options)
            .map(response => response.json().id);
    }

    deleteGroup(groupId: number): Observable<void> {
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(`${this.groupsUrl}/${groupId}`, headers)
            .map(response => null);
    }

    update(groupData: Group): Observable<void> {
        var body = JSON.stringify(groupData);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

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

    addTeacher(groupId: number, teacherId: number): Observable<number> {
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(`${this.groupTeacherUrl}/${groupId}/${teacherId}`, options)
            .map(response => groupId);
    }

    removeTeacher(groupId: number, teacherId: number): Observable<number> {
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(`${this.groupTeacherUrl}/${groupId}/${teacherId}`, headers)
            .map(response => groupId);
    }
}
