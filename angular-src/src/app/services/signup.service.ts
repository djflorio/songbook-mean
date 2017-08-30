import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';

import 'rxjs/add/operator/map';

@Injectable()
export class SignupService {

  constructor(private http: Http) { }

  private serverApi = 'http://localhost:3000';

  public addUser(user : User) {
    let URI = `${this.serverApi}/users/`;
    let headers = new Headers;
    let body = JSON.stringify({
      username: user.username,
      email: user.email,
      password: user.password
    });
    console.log(body);
    headers.append('Content-Type', 'application/json');
    return this.http.post(URI, body, {headers: headers})
      .map(res => res.json());
  }

}
