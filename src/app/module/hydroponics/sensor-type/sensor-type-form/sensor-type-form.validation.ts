import { Validators, FormBuilder } from '@angular/forms';

export function getSensorTypeFormValidator(formBuilder: FormBuilder) {
  return formBuilder.group({
    type: ['', [Validators.required, Validators.maxLength(45)]],
    measuringUnit: ['', [Validators.maxLength(45)]],
  });
}
