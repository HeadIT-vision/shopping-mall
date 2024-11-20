import { Injectable } from '@angular/core';
import {AbstractControl, ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class SignUpViewModelValidator {

  constructor() { }

  private checkRequired(control: AbstractControl): ValidationErrors | null {
    return !control.value ? { required: true } : null;
  }

  validateEmail(control: AbstractControl): ValidationErrors | null {
    const requiredError = this.checkRequired(control);
    if (requiredError) return requiredError;

    return !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(control.value) ? { pattern: true } : null;
  }

  validatePassword(control: AbstractControl): ValidationErrors | null {
    const requiredError = this.checkRequired(control);
    if (requiredError) return requiredError;

    return control.value.length < 6 ? { minlength: true } : null;
  }

  validatePasswordConfirm(control: AbstractControl, password: string): ValidationErrors | null {
    const requiredError = this.checkRequired(control);
    if (requiredError) return requiredError;

    return control.value !== password ? { mismatch: true } : null;
  }

  validateUserName(control: AbstractControl): ValidationErrors | null {
    return this.checkRequired(control);
  }

  validateMobile(control: AbstractControl): ValidationErrors | null {
    return this.checkRequired(control);
  }

  validatePostCode(control: AbstractControl): ValidationErrors | null {
    return this.checkRequired(control);
  }

  validateAddress(control: AbstractControl): ValidationErrors | null {
    return this.checkRequired(control);
  }

  validateExtraAddress(control: AbstractControl): ValidationErrors | null {
    return this.checkRequired(control);
  }
}
