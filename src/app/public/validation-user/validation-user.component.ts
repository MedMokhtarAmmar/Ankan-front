import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../core/services/user.service';

@Component({
  selector: 'app-validation-user',
  templateUrl: './validation-user.component.html',
  styles: []
})
export class ValidationUserComponent implements OnInit {

  private token: string;
  private email: string;
  public message: string;

  constructor(private router: Router, private userService: UserService, private activatedRoute: ActivatedRoute) {
    this.message = 'Wait a few seconds';
    this.activatedRoute.queryParams.subscribe( (params: any) =>{
      this.email = params.email;
      this.token = params.token;
    });
  }

  ngOnInit() {

  }
}
