import { Injectable } from '@angular/core';
import { HttpInterceptor } from "@angular/common/http";
import { TokenService } from "./token.service";
import { HttpRequest } from "@angular/common/http";
import { HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs";
import { HttpEvent } from "@angular/common/http";

@Injectable()
export class TokenInterceptorService implements HttpInterceptor{

  constructor( private tokenService: TokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const headerConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'}
    const token = this.tokenService.getToken();

    if(token){
      headerConfig['Authorization'] = `JWT ${token}`;
      console.log('token: ', token)
      console.log('headerConfig: ', headerConfig)
    }
    const _req = req.clone({ setHeaders:  headerConfig});
    return next.handle(_req);
  }

}


// import { TokenService } from './token.service';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
//
// @Injectable()
// export class TokenInterceptorService implements HttpInterceptor {
//   constructor(private tokenService: TokenService) {}
//
//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const headersConfig = {'Content-Type': 'application/json', Accept: 'application/json'};
//     const token = this.tokenService.getToken();
//     if (token) {
//       headersConfig['Authorization'] = `beader ${token}`;
//     }
//     const _req = req.clone({ setHeaders: headersConfig });
//     return next.handle(_req);
//   }
// }
