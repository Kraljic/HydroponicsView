import { FormBuilder, Validators } from '@angular/forms';
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from '../../core/constants/password.const';
import { Password } from '../../core/validators/password';
import { PasswordsMatch } from '../../core/validators/passwords-match';

export function getPasswordFormValidator(formBuilder: FormBuilder) {
  return formBuilder.group(
    {
      oldPassword: ['', [Validators.required]],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(PASSWORD_MIN_LENGTH),
          Validators.maxLength(PASSWORD_MAX_LENGTH),
        ],
      ],
      newPasswordRepeat: ['', [Validators.required]],
    },
    {
      validator: [
        Password('newPassword'),
        PasswordsMatch('newPassword', 'newPasswordRepeat'),
      ],
    }
  );
}
