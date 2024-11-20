import {Component, ViewChild} from '@angular/core';
import {UserApi} from "../../service/api/user.api";
import {SignUpRequest} from "../../model/request/sign-up.request";
import {SignUpViewModel} from "../../model/view/sign-up-view.model";
import {NgForm} from "@angular/forms";
import {SignUpViewModelValidator} from "../../service/validator/sign-up-view.model.validator";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

  @ViewChild('signUpForm') signUpForm!: NgForm;
  submitted: boolean = false;
  public model: SignUpViewModel = SignUpViewModel.create();

  constructor(
    private api: UserApi,
    private validator: SignUpViewModelValidator) {}

  onSubmit() {
    this.submitted = true;
    this.api.signUp(SignUpRequest.mapFrom(this.model))
      .then(() => {
        console.log(`회원가입 성공`);
      })
      .catch((e) => {
        console.log(`회원가입 실패: ${JSON.stringify(e)}`);
      });
  }

  onEmailChanged() {
    const control = this.signUpForm.controls['email'];
    if (control) {
      control.setErrors(this.validator.validateEmail(control));
    }
  }

  onPasswordChanged() {
    const control = this.signUpForm.controls['password'];
    if (control) {
      control.setErrors(this.validator.validatePassword(control));
    }
  }
  onPasswordConfirmChanged() {
    const control = this.signUpForm.controls['password'];
    const confirmControl = this.signUpForm.controls['passwordConfirm'];
    if (control && confirmControl) {
      confirmControl.setErrors(this.validator.validatePasswordConfirm(confirmControl, control.value));
    }
  }
  onUserNameChanged() {
    const control = this.signUpForm.controls['userName'];
    if (control) {
      control.setErrors(this.validator.validateUserName(control));
    }
  }
  onMobileChanged() {
    const control = this.signUpForm.controls['mobile'];
    if (control) {
      control.setErrors(this.validator.validateMobile(control));
    }
  }

  onPostCodeChanged() {
    const control = this.signUpForm.controls['postCode'];
    if (control) {
      control.setErrors(this.validator.validatePostCode(control));
    }
  }

  onAddressChanged() {
    const control = this.signUpForm.controls['address'];
    if (control) {
      control.setErrors(this.validator.validateAddress(control));
    }
  }

  onExtraAddressChanged() {
    const control = this.signUpForm.controls['extraAddress'];
    if (control) {
      control.setErrors(this.validator.validateExtraAddress(control));
    }
  }
}
