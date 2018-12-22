import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment.prod";


@Injectable({
  providedIn: 'root'
})
export class PostService {

  private urlPostAddPost = environment.url + 'api/chatapp/add';
  private urlGetAllPost = environment.url + 'api/chatapp/posts';
  private urlGetOnePost = environment.url + 'api/chatapp/post/';
  private urlPostLike = environment.url + 'api/chatapp/add-like';
  private urlPostComment = environment.url + 'api/chatapp/add-comment';

  constructor( private http: HttpClient) { }

  addPost(body): Observable<any>{
    return this.http.post(this.urlPostAddPost, body);
  }

  showAllPost(): Observable<any>{
    return this.http.get(this.urlGetAllPost);
  }

  addLike(body): Observable<any>{
    return this.http.post(this.urlPostLike, body);
  }

  addComment(post_id, comment): Observable<any>{
    return this.http.post(this.urlPostComment, {post_id, comment});
  }

  getPost(id): Observable<any>{
    return this.http.get(this.urlGetOnePost + id);
  }

}
