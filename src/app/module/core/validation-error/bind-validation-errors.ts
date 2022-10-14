import { AbstractControl } from '@angular/forms';
import { ServerValidationError } from './server-validation-error.model';

function mapServerValidationErrors(err: any): ServerValidationError[] {
  let serverValidationError: ServerValidationError[] = [];

  if (err.error?.apierror?.subErrors == undefined) {
    return;
  }

  let rawServerValidationErrors = err.error.apierror.subErrors;
  if (rawServerValidationErrors == null) {
    return;
  }

  rawServerValidationErrors.forEach((error) => {
    serverValidationError.push(error as ServerValidationError);
  });

  return serverValidationError;
}

export function bindValidationErrors(
  err: any,
  controls: {
    [key: string]: AbstractControl;
  }
) {
  let serverValidationErrors = mapServerValidationErrors(err);

  serverValidationErrors.forEach((error, index) => {
    let control = controls[error.field];

    let controlErrors = control.errors || {};

    let errorIndex = 'serverValidationError_' + index;
    controlErrors[errorIndex] = error.message;

    control.setErrors(controlErrors);
    control.markAsTouched();
  });
}
