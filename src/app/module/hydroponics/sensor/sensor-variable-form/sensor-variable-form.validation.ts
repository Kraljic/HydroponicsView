import { Validators, FormBuilder } from '@angular/forms';

export function getSensorVariableFormValidator(formBuilder: FormBuilder) {
  return formBuilder.group({
    minValue: ['', [Validators.required]],
    maxValue: ['', [Validators.required]],
  });
}
