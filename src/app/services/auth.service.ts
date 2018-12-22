import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {}

  private urlPostRegister = environment.url + 'api/auth/register';
  private urlPostLogin    = environment.url + 'api/auth/login';

  registerUser(body): Observable<any> {
    return this.http.post(this.urlPostRegister, body);
  }


  loginUser(body): Observable<any> {
    return this.http.post(this.urlPostLogin, body);
  }
}
