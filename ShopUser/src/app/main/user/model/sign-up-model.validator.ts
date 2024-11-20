import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {UserEmail} from "./vo/user-email.vo";

export const signUpModelValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {

  const email = control.get('email');
  const password = control.get('password');
  const passwordConfirm = control.get('passwordConfirm');
  const userName = control.get('userName');
  const mobile = control.get('mobile');
  const postCode = control.get('postCode');
  const address = control.get('address');
  const extraAddress = control.get('extraAddress');

  try {
    new UserEmail(email?.value);
    return null;
  }
  catch (e) {
    return <ValidationErrors>({email: e});
  }


};
