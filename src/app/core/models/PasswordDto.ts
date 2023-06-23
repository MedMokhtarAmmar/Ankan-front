export class PasswordDto {

  public newPassword: string;
  public oldPassword: string;

  constructor(newPassword?: string, oldPassword?: string) {
    this.newPassword = newPassword;
    this.oldPassword  = oldPassword;
  }
}
