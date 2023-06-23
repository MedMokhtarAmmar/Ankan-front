import {Component, OnInit} from '@angular/core';
import {UserService} from '../../core/services/user.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import Auth from '@aws-amplify/auth';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styles: []
})
export class ResetPasswordComponent implements OnInit {

  public email = '';

  resetForm: FormGroup;
  submitted: boolean;


  constructor(public userService: UserService,
              private toastr: ToastrService,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    this.resetForm = this.formBuilder.group({
      username: ['', Validators.maxLength(20)],
      code: ['', Validators.required],
      userPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required,],
    });
  }

  get f() {
    return this.resetForm.controls;
  }

  resetPassword(username: string, code: any, password: string) {

    Auth.forgotPasswordSubmit(username, code, password)
      .then(data => {
        console.log(data)
        this.toastr.info("Votre mot de pass a été changé avec succés")
        this.router.navigateByUrl('/')
      })
      .catch(err => console.log(err));
  }

  onSubmit() {
    this.submitted = true;
    if (this.resetForm.invalid) {
      return null;
    }

    this.resetPassword(this.resetForm.get('username').value, this.resetForm.get('code').value, this.resetForm.get('userPassword').value)
  }

}
