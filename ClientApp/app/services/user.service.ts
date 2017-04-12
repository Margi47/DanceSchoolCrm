import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { User } from '../models/user';
import { Group } from '../models/group';

@Injectable()
export class UserService {
    private usersUrl = 'api/users';

    constructor(private http: Http) { }

    getUsers(): Observable<User[]> {
        return this.http.get(this.usersUrl)
            .map(response => response.json());
    }

    getUser(id: number): Observable<User> {
        return this.http.get(`${this.usersUrl}/${id}`)
            .map(response => response.json());
    }

    getUserWithGroups(id: number): Observable<User> {
        return this.getUser(id).map(u => { this.getUserGroups(id).map(g => u.groups = g); return u;});
    }

    addUser(user: User): Observable<User> {
        var body = JSON.stringify(user);
        console.log(body);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.usersUrl, body, options)
            .map(response => response.json());
    }

    deleteUser(user: User): Observable<User> {
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(`${this.usersUrl}/${user.id}`, headers)
            .map(response => user);
    }

    update(userData: User): Observable<User> {
        var body = JSON.stringify(userData);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        console.log('before update');
        return this.http.put(`${this.usersUrl}/${userData.id}`, body, options)
            .map(response => userData);
    }

    getUserGroups(userId: number): Observable<Group[]> {
        return this.http.get(`${this.usersUrl}/${userId}/groups`)
            .map(response => { console.log(response); return response.json(); });
    }

    getAllGroups(): Observable<Group[]> {
        return this.http.get('api/groups')
            .map(response => response.json());
    }

    addGroup(userId: number, groupId: number): Observable<User> {
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(`${this.usersUrl}/${userId}/groups/${groupId}`, options)
            .map(response =>  response.json() );
    }
}