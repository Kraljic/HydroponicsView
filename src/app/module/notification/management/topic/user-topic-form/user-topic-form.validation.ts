import { Validators, FormBuilder } from '@angular/forms';

export function getUserTopicFormValidator(formBuilder: FormBuilder) {
  return formBuilder.group({
    topics: [''],
  });
}
