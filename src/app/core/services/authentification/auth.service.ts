import {Injectable} from '@angular/core';
import { Auth } from 'aws-amplify';

import * as conf from '../../../../config/config.json'


@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor() {



    // Auth.configure(conf.amplify.cognito);

  }



  public signin(usrname: string, pwd: string) {
    return Auth.signIn({username: usrname, password: pwd})
  }

  public signup(mail: string, pwd: string, usrname: string, profil: string) {

    return Auth.signUp(
      {
        username: usrname,
        password: pwd,

        attributes: {email: mail,profile:profil}
      });

  }



}
