import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {AuthInterceptor, httpInterceptorProviders} from './services/authentification/auth-interceptor';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,

  ],
  providers: [
    httpInterceptorProviders,
    AuthInterceptor, {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService,
  ],

})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded.');
    }
  }
}
