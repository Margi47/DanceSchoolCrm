import { Injectable, Inject } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/forkJoin';

import { User } from '../models/user';
import { Group } from '../models/group';
import { Teacher } from '../models/teacher';

@Injectable()
export class UserService {
    private usersUrl;
    private groupUserUrl;

    constructor(private http: Http) {
        this.usersUrl = environment.url + '/api/users';
        this.groupUserUrl = environment.url + '/api/groupuser';
    }

    getUsers(page: number, filter: string): Observable<any> {
        return this.http.get(`${this.usersUrl}?filter=${filter}&page=${page}&pagesize=10`)
            .map(response => {
                const data = response.json();
                data.filter = filter;
                return data;
            });
    }

    getUser(id: number): Observable<User> {
        return this.http.get(`${this.usersUrl}/${id}`)
            .map(response => response.json());
    }

    getUserGroups(userId: number): Observable<Group[]> {
        return this.http.get(`${this.groupUserUrl}/${userId}/groups`)
            .map(response => response.json());
    }

    getAvailableStudents(groupId: number, page: number, filter: string): Observable<any> {
        return this.http.get(`${this.groupUserUrl}/${groupId}/students/available?filter=${filter}&page=${page}&pagesize=10`)
            .map(response => {
                const data = response.json();
                data.filter = filter;
                return data;
            });
    }

    getAvailableTeachers(page: number, filter: string): Observable<any> {
        return this.http.get(`${this.usersUrl}/teachers/available?filter=${filter}&page=${page}&pagesize=10`)
            .map(response => {
                const data = response.json();
                data.filter = filter;
                return data;
            });
    }

    addUser(user: User): Observable<number> {
        var body = JSON.stringify(user);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.usersUrl, body, options)
            .map(response => response.json())
            .mergeMap(user => {
                if (user.isTeacher) {
                    return this.createTeacher(user).map(x => user.id);
                }
                return Observable.of(user.id);
            });
    }

    deleteUser(userId: number): Observable<void> {
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(`${this.usersUrl}/${userId}`, headers)
            .map(response => null);
    }

    update(userData: User): Observable<void> {
        var body = JSON.stringify(userData);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(`${this.usersUrl}/${userData.id}`, body, options)
            .map(response => null);
    }

    addGroup(userId: number, groupId: number): Observable<number> {
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(`${this.groupUserUrl}/${userId}/${groupId}`, options)
            .map(response => userId);
    }

    removeGroup(userId: number, groupId: number): Observable<number> {
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(`${this.groupUserUrl}/${userId}/${groupId}`, options)
            .map(response => userId);
    }

    createTeacher(userData: User): Observable<number> {
        var teacher: Teacher = { id: userData.id, name: userData.name, groups: [], styles: [] };
        var body = JSON.stringify(teacher);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post('api/teachers', body, options)
            .map(response => userData.id);
    }

    deleteTeacher(userId: number): Observable<number> {
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        var teacherUrl = 'api/teachers';
        return this.http.delete(`${teacherUrl}/${userId}`, headers)
            .map(response => userId);
    }
}
