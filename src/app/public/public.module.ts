import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PublicRoutingModule} from './public-routing.module';
import {SharedModule} from '../shared/shared.module';
import {LoginComponent} from './login/login.component';
import {PublicComponent} from './public.component';
import {RegisterComponent} from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { PasswordChangedComponent } from './password-changed/password-changed.component';
import { ValidationUserComponent } from './validation-user/validation-user.component';




@NgModule({
  declarations: [
    LoginComponent,
    PublicComponent,
    RegisterComponent,
    ResetPasswordComponent,
    PasswordChangedComponent,
    ValidationUserComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule,
  ]
})
export class PublicModule {
  constructor() {

  }
}
