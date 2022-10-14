import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from '../../../core/constants/password.const';
import { Validators, FormBuilder } from '@angular/forms';
import { Password } from '../../../core/validators/password';

export function getRegisterFormValidator(formBuilder: FormBuilder) {
  return formBuilder.group(
    {
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(45),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.email, Validators.maxLength(100)],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(PASSWORD_MIN_LENGTH),
          Validators.maxLength(PASSWORD_MAX_LENGTH),
        ],
      ],
      roles: [''],
    },
    {
      validator: [Password('password')],
    }
  );
}
