import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {signUpModelValidator} from "../../model/sign-up-model.validator";
import {UserApi} from "../../api/user.api";
import {SignUpRequest} from "../../model/request/sign-up.request";
import {SignUpModel} from "../../model/sign-up.model";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {

  public model: SignUpModel = SignUpModel.create();
  // public formGroup: FormGroup = this.formBuilder.group({
  //   email: new FormControl('', [Validators.required, Validators.email]),
  //   password: new FormControl('', [Validators.required]),
  //   passwordConfirm: new FormControl('', [Validators.required]),
  //   userName: new FormControl('', [Validators.required]),
  //   mobile: new FormControl('', [Validators.required]),
  //   postCode: new FormControl('', [Validators.required]),
  //   address: new FormControl('', [Validators.required]),
  //   extraAddress: new FormControl('', [Validators.required])
  // });

  constructor(

    private api: UserApi) {}

  onSubmit() {
    this.api.signUp(SignUpRequest.mapFrom(this.model))
      .then(() => {
        console.log(`회원가입 성공`);
      })
      .catch((e) => {
        console.log(`회원가입 실패: ${JSON.stringify(e)}`);
      });
    // if (this.formGroup.valid) {
    //   console.log('submit');
    //
    // }
  }
}
