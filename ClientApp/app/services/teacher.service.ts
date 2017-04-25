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

    constructor(private http: Http) { }

    getTeachers(): Observable<Teacher[]> {
        return this.http.get(this.teachersUrl)
            .map(response => response.json());
    }

    getTeachersWithGroups(): Observable<Teacher[]> {
        return this.http.get(`${this.teachersUrl}/all`)
            .map(response => response.json());
    }

    addTeacher(teacher: Teacher): Observable<Teacher> {
        console.log("adding new teacher from service");
        var body = JSON.stringify({ id: teacher.id, name: teacher.name });
        console.log(body);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.teachersUrl, body, options)
            .map(response => teacher);
    }

    getTeacherGroups(teacherId: number) {
        return this.http.get(`${this.teachersUrl}/${teacherId}/groups`)
            .map(response => response.json());
    }

    addGroups(teacherId: number, groups: number[]): Observable<number> {
        console.log("adding groups from service, teacher id:" + groups);
        var body = JSON.stringify(groups);
        console.log(body);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(`${this.teachersUrl}/${teacherId}/groups`, body, options)
            .map(response => teacherId);        
    }

    deleteGroup(teacherId: number, groupId: number): Observable<number> {
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(`${this.teachersUrl}/${teacherId}/groups/${groupId}`, headers)
            .map(response => groupId);
    }

    getTeacher(id: number): Observable<Teacher> {
        return this.http.get(`${this.teachersUrl}/${id}`)
            .map(response => response.json());
    }

    deleteTeacher(teacher: Teacher): Observable<Teacher> {
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(`${this.teachersUrl}/${teacher.id}`, headers)
            .map(response => teacher);
    }
}