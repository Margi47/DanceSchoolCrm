import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { User } from '../models/user';
import { Group } from '../models/group';
import { Teacher } from '../models/teacher';

@Injectable()
export class TeacherService {
    private teachersUrl = 'api/teachers';
    private groupTeacherUrl = 'api/groupteacher';

    constructor(private http: Http) { }

    getTeachers(): Observable<Teacher[]> {
        return this.http.get(this.teachersUrl)
            .map(response => response.json());
    }

    getAvailableTeachers(groupId: number): Observable<Teacher[]> {
        return this.http.get(`${this.groupTeacherUrl}/${groupId}/teachers/available`)
            .map(response => response.json());
    }

    getTeacher(id: number): Observable<Teacher> {
        return this.http.get(`${this.teachersUrl}/${id}`)
            .map(response => response.json());
    }

    addTeacher(teacher: Teacher): Observable<number> {
        console.log("adding new teacher from service");
        console.log(teacher);
        var body = JSON.stringify({ id: teacher.id, name: teacher.name });
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.teachersUrl, body, options)
            .map(response => teacher.id);
    }

    deleteTeacher(teacher: Teacher): Observable<void> {
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(`${this.teachersUrl}/${teacher.id}`, headers)
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

    deleteGroup(teacherId: number, groupId: number): Observable<number> {
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(`${this.groupTeacherUrl}/${groupId}/${teacherId}`, headers)
            .map(response => teacherId);
    }
}