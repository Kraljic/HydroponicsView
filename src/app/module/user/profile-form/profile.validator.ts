import { FormBuilder, Validators } from '@angular/forms';

export function getProfileFormValidator(formBuilder: FormBuilder) {
  return formBuilder.group({
    firstName: ['', [/*Validators.required,*/ Validators.maxLength(45)]],
    lastName: ['', [/*Validators.required,*/ Validators.maxLength(45)]],
  });
}
