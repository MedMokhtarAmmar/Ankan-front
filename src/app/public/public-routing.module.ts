import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {PasswordChangedComponent} from './password-changed/password-changed.component';
import {ValidationUserComponent} from './validation-user/validation-user.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'password-change' , component: PasswordChangedComponent},
  {path: 'validation' , component: ValidationUserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule {
}
