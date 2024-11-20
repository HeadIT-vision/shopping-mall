import {SignUpViewModel} from "../view/sign-up-view.model";

export class SignUpRequest {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly passwordConfirm: string,
    public readonly userName: string,
    public readonly mobile: string,
    public readonly postCode: string,
    public readonly address: string,
    public readonly extraAddress: string
  ) { }

  public static mapFrom(model: SignUpViewModel) {
    return new SignUpRequest(
      model.email,
      model.password,
      model.passwordConfirm,
      model.userName,
      model.mobile,
      model.postCode,
      model.address,
      model.extraAddress);
  }
}
