import { Injectable } from '@angular/core';
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class TokenService {

  constructor( private cookieSerivce: CookieService ) { }

  getToken(){
    return this.cookieSerivce.get('auth');
  }

  setToken(token){
    this.cookieSerivce.set('auth', token);
  }

  deleteToken(){
    return this.cookieSerivce.delete('auth');
  }

  getPayload(){
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];

      payload = JSON.parse(window.atob(payload));  // recupere payload

    }
    console.log("payload ", payload)
    return payload;
  }

}
