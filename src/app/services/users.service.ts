import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private urlGetUsers = environment.url + 'api/chatapp/users';
  private urlGetUserById = environment.url + 'api/chatapp/user/';
  private urlGetUserByUsername = environment.url + 'api/chatapp/username/';
  private urlPostFollowUser = environment.url + 'api/chatapp/follow-user';
  private urlPostUnFollowUser = environment.url + 'api/chatapp/unfollow-user';
  private urlPostMarkNotifi = environment.url + 'api/chatapp/mark/';
  private urlPostMarkReadAll = environment.url + 'api/chatapp/mark-all';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get(this.urlGetUsers);
  }

  getUserById(id): Observable<any> {
    return this.http.get(this.urlGetUserById + id);
  }

  getUserByUsername(username): Observable<any> {
    return this.http.get(this.urlGetUserByUsername + username);
  }

  followUser(userFollowed): Observable<any> {
    return this.http.post(this.urlPostFollowUser, {userFollowed});
  }

  unfollowUser(userFollowed): Observable<any> {
    return this.http.post(this.urlPostUnFollowUser, {userFollowed});
  }

  markNotification(id, deleteValue?){
    return this.http.post(this.urlPostMarkNotifi + id, {id, deleteValue});
  }

  markAllRead(): Observable<any> {
    return this.http.post(this.urlPostMarkReadAll, {all: true});
  }

}
