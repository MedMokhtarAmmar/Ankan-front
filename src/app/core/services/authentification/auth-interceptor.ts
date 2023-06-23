import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";
import * as conf from '../../../../config/config.json' ;


const TOKEN_HEADER_KEY = 'Authorization';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {






  public BASE_URL: any;
  public token: any;

  constructor() {
  }
  // getBaseUrl() {
  //   fetch('../../../config/config.json').then(res => {
  //     res.json().then((res) => {
  //       localStorage.setItem('BASE_URL', res.apiUrl+'/');
  //     });
  //   });
  // }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {



    this.BASE_URL = localStorage.getItem('BASE_URL');
    let authReq = req;
    for (let i = 0, len = localStorage.length; i < len; ++i) {

      if (localStorage.key(i).includes('idToken')) {
        this.token = localStorage.getItem(localStorage.key(i));
      }
    }
    if (this.token != null) {
      authReq = req.clone({
        url: this.BASE_URL + req.url,
        headers: req.headers.set(TOKEN_HEADER_KEY, this.token)

      });
    } else {
      authReq = req.clone({url: this.BASE_URL + req.url});
    }

    return next.handle(authReq);
  }
















  // public BASE_URL = conf.apiUrl;
  // public token: any;
  //
  // constructor() {
  // }
  //
  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   let authReq = req;
  //   for (var i = 0, len = localStorage.length; i < len; ++i) {
  //
  //     if (localStorage.key(i).includes('idToken')) {
  //       this.token = localStorage.getItem(localStorage.key(i))
  //     }
  //   }
  //
  //
  //
  //   if (this.token != null) {
  //
  //     authReq = req.clone({
  //       url: this.BASE_URL + req.url,
  //       headers: req.headers.set(TOKEN_HEADER_KEY, this.token)
  //
  //     });
  //   } else {
  //     authReq = req.clone({url: this.BASE_URL + req.url});
  //   }
  //
  //   return next.handle(authReq);
  // }

}

export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];

