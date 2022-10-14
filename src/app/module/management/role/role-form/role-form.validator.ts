import { Validators, FormBuilder } from '@angular/forms';

export function getRoleFormValidator(formBuilder: FormBuilder) {
  return formBuilder.group({
    role: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(45)],
    ],
    authorities: ['', []],
  });
}
