import { Injectable } from '@angular/core';
import { NotificationService } from '../../shared/notification/notification.service';
import { AbstractControl } from '@angular/forms';
import { VALIDATION_ERROR_MESSAGE } from '../validation-error/server-validation-error.const';
import { bindValidationErrors } from '../validation-error/bind-validation-errors';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(
    private notificationService: NotificationService,
    private router: Router
  ) {}

  simpleErrorHandler(err: any, navigationCommands?: any[]) {
    let message = err.error?.apierror?.message;

    if (message != undefined) {
      this.notificationService.error(message);
    } else {
      this.notificationService.error();
    }

    if (navigationCommands) {
      this.router.navigate(navigationCommands);
    }
  }

  validationErrorHandler(
    err: any,
    controls: {
      [key: string]: AbstractControl;
    }
  ) {
    let message = err.error?.apierror?.message;

    if (message == VALIDATION_ERROR_MESSAGE) {
      bindValidationErrors(err, controls);
    } else {
      this.simpleErrorHandler(err);
    }
  }
}
