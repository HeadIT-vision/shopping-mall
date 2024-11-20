export class SignUpViewModel {

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

  public static create() {
    // return this.fakeData();
    return new SignUpViewModel('', '', '', '', '', '', '', '');
  }

  static fakeData() {
    return new SignUpViewModel('iamdevstar@gmail.com', 'P@ssw0rd', 'P@ssw0rd', 'mklee', '01072475702', '12345', '서울시 용산구 130', '102호');
  }
}
