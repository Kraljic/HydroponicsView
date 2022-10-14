import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationService } from '../../shared/notification/notification.service';
import { UserService } from '../../core/user/user.service';
import { PasswordCommand } from './password-command';
import { getPasswordFormValidator } from './password.validator';
import { VALIDATION_ERROR_MESSAGE } from '../../core/validation-error/server-validation-error.const';
import { bindValidationErrors } from '../../core/validation-error/bind-validation-errors';
import { ErrorHandlerService } from '../../core/error-handler/error-handler.service';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styles: [],
})
export class PasswordFormComponent implements OnInit {
  passwordCommand: PasswordCommand;

  formGroup: FormGroup;

  saving: boolean = false;

  constructor(
    private location: Location,
    private router: Router,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private userService: UserService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.passwordCommand = new PasswordCommand();

    this.formGroup = getPasswordFormValidator(this.formBuilder);
  }

  get f() {
    return this.formGroup.controls;
  }
  get model() {
    return this.passwordCommand;
  }

  save() {
    this.userService.updatePassword(this.model).subscribe(
      () => {
        this.router.navigate(['main']);
        this.notificationService.success('notification.success.editPassword');
      },
      (err: any) => this.errorHandlerService.validationErrorHandler(err, this.f)
    );
  }

  cancle() {
    this.location.back();
  }
}
