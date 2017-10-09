import { Injectable, Inject } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { User } from '../models/user';
import { Group } from '../models/group';
import { Teacher } from '../models/teacher';

@Injectable()
export class TeacherService {
    private teachersUrl;
    private groupTeacherUrl;

    constructor(private http: Http) {
        this.teachersUrl = environment.url + '/api/teachers';
        this.groupTeacherUrl = environment.url + '/api/groupteacher';
    }

    getTeachers(page: number, filter: string): Observable<any> {
        return this.http.get(`${this.teachersUrl}?filter=${filter}&page=${page}&pagesize=10`)
            .map(response => {
                const data = response.json();
                data.filter = filter;
                return data;
            });
    }

    getAvailableTeachers(groupId: number, page: number, filter: string): Observable<any> {
        return this.http.get(`${this.groupTeacherUrl}/${groupId}/teachers/available?filter=${filter}&page=${page}&pagesize=10`)
            .map(response => {
                const data = response.json();
                data.filter = filter;
                return data;
            });
    }

    getTeacher(id: number): Observable<Teacher> {
        return this.http.get(`${this.teachersUrl}/${id}`)
            .map(response => response.json());
    }

    addTeacher(teacher: Teacher): Observable<number> {
        var body = JSON.stringify({ id: teacher.id, name: teacher.name });
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });


        return this.http.post(this.teachersUrl, body, options)
            .map(response => teacher.id);
    }

    deleteTeacher(teacherId: number): Observable<void> {
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(`${this.teachersUrl}/${teacherId}`, options)
            .map(response => null);
    }

    getTeacherGroups(teacherId: number): Observable<Group[]> {
        return this.http.get(`${this.groupTeacherUrl}/${teacherId}/groups`)
            .map(response => response.json());
    }

    addGroup(teacherId: number, groupId: number): Observable<number> {
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(`${this.groupTeacherUrl}/${groupId}/${teacherId}`, options)
            .map(response => teacherId);        
    }

    deleteGroup(groupId: number, teacherId: number): Observable<number> {
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(`${this.groupTeacherUrl}/${groupId}/${teacherId}`, options)
            .map(response => teacherId);
    }
}
