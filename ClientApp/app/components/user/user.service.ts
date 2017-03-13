import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { User } from './user';
import { USERS } from './mock-users';

@Injectable()
export class UserService {
    private usersUrl = 'api/users'; 

    constructor(private http: Http) { }

    getUsers(): Observable<User[]> {
        return this.http.get(this.usersUrl)
            .map(response => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getUser(id: number): Observable<User> {
        return this.http.get(`${this.usersUrl}/${id}`)
            .map(response => response.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    addUser(user: User): Observable<User[]> {
        var body = JSON.stringify(user);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.usersUrl, body, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    deleteUser(id: number): Observable<User[]> {
        return this.http.delete(`${this.usersUrl}/${id}`)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    update(userData: User): Observable<User> {
        var body = JSON.stringify(userData);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(`${this.usersUrl}/${body['id']}`, body, options)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
}