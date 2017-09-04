import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../models/user';
import { Song } from '../models/song';

@Injectable()
export class SongService {

  constructor(private http: Http) { }

  getAll() {
    return this.http.get('/songs').map((response: Response) => response.json());
  }

  getByUserId(_id: string) {
    return this.http.get('/songs/user/' + _id).map((response: Response) => response.json());
  }

}


/*


  create(user: User) {
    return this.http.post('/users', user);
  }

  update(user: User) {
    //return this.http.put('/users/' + user._id, user);
    console.log("UPDATE");
  }

  delete(_id: string) {
    return this.http.delete('/users/' + _id);
  }

}
*/