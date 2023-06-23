import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthInterceptor} from '../../core/services/authentification/auth-interceptor';
import {UserService} from '../../core/services/user.service';
import {FormBuilder} from '@angular/forms';
import {TokenStorageService} from '../../core/services/authentification/token-storage.service';
import {User} from '../../core/models/User';

@Component({
  selector: 'app-courtier',
  templateUrl: './courtier.component.html',
  styles: []
})
export class CourtierComponent implements OnInit {
  public user: User;
  public show :boolean;
  public clickedEvent: boolean;


  constructor(private router: Router,
              private authInterceptor: AuthInterceptor,
              private userService: UserService,
              public formBuilder: FormBuilder,
              private tokenStorage: TokenStorageService) {
    this.user = new User();
    this.show =true;

  }

  ngOnInit() {

  }

  logout() {
    this.tokenStorage.signOut();
    this.router.navigate(['/']);
  }
  childEventClicked(event: boolean) {
    this.clickedEvent = event;
  }


}
