import { FormBuilder, Validators } from '@angular/forms';

export function getUserRolesFormValidator(formBuilder: FormBuilder) {
  return formBuilder.group({
    username: ['', []],
    roles: ['', []],
  });
}
