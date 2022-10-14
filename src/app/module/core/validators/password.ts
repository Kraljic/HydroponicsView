import { FormGroup } from '@angular/forms';
import {
  PASSWORD_LOWER_CASE,
  PASSWORD_UPPER_CASE,
  PASSWORD_NUMERIC,
} from '../constants/password.const';

export function Password(controlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];

    let password = control.value;

    let errors: any = control.errors || {};

    if (PASSWORD_LOWER_CASE) {
      if (/[a-z]/.test(password) == false) {
        errors.pw_lowercase = true;
      }
    }
    if (PASSWORD_UPPER_CASE) {
      if (/[A-Z]/.test(password) == false) {
        errors.pw_uppercase = true;
      }
    }
    if (PASSWORD_NUMERIC) {
      if (/[0-9]/.test(password) == false) {
        errors.pw_number = true;
      }
    }
    if (PASSWORD_LOWER_CASE) {
      if (/[!"#$%&'()*+,-./:;<=>?@\[\]^_`{\|}~]/.test(password) == false) {
        errors.pw_special = true;
      }
    }

    if (Object.keys(errors).length > 0) {
      control.setErrors(errors);
    } else {
      control.setErrors(null);
    }
  };
}
