export class SignInData {

  public email: string;
  public userPassword: string;

  constructor(email?: string, userPassword?: string) {
    this.email = email;
    this.userPassword = userPassword;
  }
}
