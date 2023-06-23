import {Component, OnInit} from '@angular/core';
import {User} from "../../core/models/User";
import {TokenStorageService} from "../../core/services/authentification/token-storage.service";
import {Router} from "@angular/router";
import {UserService} from "../../core/services/user.service";
import Auth from '@aws-amplify/auth';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styles: []
})
export class ClientComponent implements OnInit {

  user: User;
  show:boolean;

  constructor(private tokenStorage: TokenStorageService,
              private userService: UserService,
              public router: Router) {
    this.user = new User();

  }

  ngOnInit() {
    Auth.currentUserInfo().then((res:any) => {
      console.log(res)
    })

  }



  logout() {
    this.tokenStorage.signOut();
    this.router.navigate(["/"])
  }
}
