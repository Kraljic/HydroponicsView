import { Validators, FormBuilder } from '@angular/forms';

export function getDeviceFormValidator(formBuilder: FormBuilder) {
  return formBuilder.group({
    name: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(45)],
    ],
    description: [
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(255)],
    ],
    firmware: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(45)],
    ],
  });
}
