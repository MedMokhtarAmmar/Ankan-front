import {Component, OnInit} from '@angular/core';
import {UserService} from '../../core/services/user.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {User} from '../../core/models/User';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordDto} from '../../core/models/PasswordDto';

@Component({
  selector: 'app-password-changed',
  templateUrl: './password-changed.component.html',
  styles: []
})
export class PasswordChangedComponent implements OnInit {

  public userEmail: string;
  public userPassword: string;
  public confirmPassword: string;
  private token: string;
  private id: string;
  registerForm: FormGroup;

  get f() {
    return this.registerForm.controls;
  }

  constructor(public userService: UserService,
              public route: ActivatedRoute,
              public router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    this.route.queryParams.subscribe((params: Params) => {
      this.token = params.token;
      this.userEmail = params.email;
    });


    this.registerForm = this.formBuilder.group({
      userPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required, ],
    });

  }








}
