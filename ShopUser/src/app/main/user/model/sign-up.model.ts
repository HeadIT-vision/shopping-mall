import {UserEmail} from "./vo/user-email.vo";
import {ValidationError} from "./vo/validation-error.inferface";

export class SignUpModel {
  public validationErrors: ValidationError[] = [];

  constructor(
      public email: string,
      public password: string,
      public passwordConfirm: string,
      public userName: string,
      public mobile: string,
      public postCode: string,
      public address: string,
      public extraAddress: string) {
  }

  // public static create() {
  //   return new SignUpModel('', '', '', '', '', '', '', '');
  // }

  public static create() {
    return this.fakeData();
  }

  static fakeData() {
    return new SignUpModel('iamdevstar@gmail.com', 'P@ssw0rd', 'P@ssw0rd', 'mklee', '01072475702', '12345', '서울시 용산구 130', '102호');
  }

  public onEmailChanged($event: any) {

  }
}
