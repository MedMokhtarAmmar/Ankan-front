import {Injectable} from '@angular/core';
import Auth from "@aws-amplify/auth";
import {Router} from "@angular/router";
import {UserService} from "../user.service";
import {User} from "../../models/User";


const TOKEN_KEY = 'token';
const AUTHORITIES_KEY = 'AuthAuthorities';
const PICTURE_KEY = 'Picture';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private roles: Array<string> = [];
  public token: any;
  public user: User;
  userID: string;
  username: string;
  profile: any;

  constructor(private userService: UserService, private router: Router) {
    this.profile=''
  }

  signOut() {
    Auth.signOut({global: true}).then(data => {
      window.localStorage.clear();
      window.sessionStorage.clear();
    }).catch(err => console.log(err))


  }


  public isUserConnected() {

    Auth.currentAuthenticatedUser({
      bypassCache: false
    }).then(user => {
      if (user) {
        console.log(user);
        this.router.navigate(['client/accueil']);
      }
    });

  }


  // public saveToken(token: string) {
  //   window.localStorage.removeItem(TOKEN_KEY);
  //   window.localStorage.setItem(TOKEN_KEY, token);
  // }

  public getToken(): string {

    for (var i = 0, len = localStorage.length; i < len; ++i) {

      if (localStorage.key(i).includes('idToken')) {
        this.token = localStorage.getItem(localStorage.key(i))
      }
    }
    return this.token;
  }
  public getUsername(): string {

    for (var i = 0, len = localStorage.length; i < len; ++i) {

      if (localStorage.key(i).includes('LastAuthUser')) {
        this.username = localStorage.getItem(localStorage.key(i))
      }
    }
    return this.username;
  }
  public saveAuthorities(authorities: string[]) {

  }

  public getAuthorities() {
    for (let i = 0, len = localStorage.length; i < len; ++i) {

      if (localStorage.key(i).includes('userData')) {
        this.profile = JSON.parse(localStorage.getItem(localStorage.key(i))).UserAttributes[2].Value;

      }
    }
     return this.profile;
  }


  public getUserPicture() {
  }

  public saveUserPicture(photo: string) {
    window.localStorage.removeItem(PICTURE_KEY);
    window.localStorage.setItem(PICTURE_KEY, photo);
  }

}
