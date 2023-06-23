export class SignUpData {

  public firstName: string;
  public lastName: string;
  public userEmail: string;
  public userPassword: string;

  constructor(firstName?: string, lastName?: string, userEmail?: string, userPassword?: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userEmail = userEmail;
    this.userPassword = userPassword;
  }
}
