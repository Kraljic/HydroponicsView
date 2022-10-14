import { Validators, FormBuilder } from '@angular/forms';

export function getSensorFormValidator(formBuilder: FormBuilder) {
  return formBuilder.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(45)],
    ],
    isManaged: [''],
  });
}
