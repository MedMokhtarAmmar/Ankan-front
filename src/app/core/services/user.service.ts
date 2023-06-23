import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {PasswordDto} from '../models/PasswordDto';
import {SignInData} from '../models/SignInData';
import {Observable} from 'rxjs';
import {User} from "../models/User";
import Auth from "@aws-amplify/auth";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public USERS_URL = `users/`;
  public UserConnected: string;
  public signIn = `users/sign-in/`;



  constructor(private http: HttpClient) {

  }


  login(signInData: SignInData) {
    return this.http.post<any>(this.signIn, signInData).toPromise();
  }

  getUser(id: string) {
    return this.http.get<User>(this.USERS_URL + id).toPromise();
  }

  getUsers(page: number, perPage: number) {
    return this.http.get<User[]>(this.USERS_URL + '?page=' + page + '&perpage=' + perPage);
  }


  total() {
    return this.http.get<any>(this.USERS_URL + 'maxSize')
  }

  ajoutUser(user: any) {
    return this.http.post(this.USERS_URL, user).toPromise();

  }

  deleteUser(user: User) {
    return this.http.delete<any>(this.USERS_URL + user.id)
  }

  modifierUser(id: string, user: User) {
    return this.http.put<User>(this.USERS_URL + id, user).toPromise()
  }


  loadUserByEmail(userEmail: string) {
    let params = new HttpParams();
    params = params.append('email', userEmail);

    return this.http.get<any>('users', {params}).toPromise();
  }


  verifyUserExistantUAT(email: string) {
    let params = new HttpParams();
    params = params.append('email', email);
    return this.http.get<any>('/', {params}).toPromise();
  }

  getIdUserConnected() {
    return new Promise<any>((resolve, reject) => {
    Auth.currentAuthenticatedUser().then((res: any) => {
      this.loadUserByEmail(res.storage.emailUser).then((res: any) => {
        this.UserConnected =  res.result[0].id;
        resolve(this.UserConnected);
      })
     })
      return this.UserConnected;
    })
  }
}


