import { Component, OnInit } from '@angular/core';
import { PasswordManagementCommand } from './password-management-command';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { getPasswordManagementFormValidator } from './password-management.validator';
import { NotificationService } from '../../../shared/notification/notification.service';
import { UserManagementService } from '../user-management.service';
import { VALIDATION_ERROR_MESSAGE } from '../../../core/validation-error/server-validation-error.const';
import { bindValidationErrors } from '../../../core/validation-error/bind-validation-errors';
import { UserDto } from '../../../core/user/user.dto';
import { ErrorHandlerService } from '../../../core/error-handler/error-handler.service';
import { UserLoaderService } from '../../../core/error-handler/user-loader.service';
@Component({
  selector: 'app-password-management-form',
  templateUrl: './password-management-form.component.html',
  styles: [],
})
export class PasswordManagementFormComponent implements OnInit {
  passwordManagementCommand: PasswordManagementCommand;
  user: UserDto;

  formGroup: FormGroup;

  saving: boolean = false;
  constructor(
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private userManagementService: UserManagementService,
    private errorHandlerService: ErrorHandlerService,
    private userLoaderService: UserLoaderService
  ) {}

  ngOnInit(): void {
    this.userLoaderService
      .tryLoadUserFromUrl(this.activatedRoute, ['user-list'])
      .subscribe((user: UserDto) => (this.user = user));

    this.passwordManagementCommand = new PasswordManagementCommand();

    this.formGroup = getPasswordManagementFormValidator(this.formBuilder);
  }

  get f() {
    return this.formGroup.controls;
  }
  get model() {
    return this.passwordManagementCommand;
  }

  rolesOnItemSelect(e: any) {}

  save() {
    this.userManagementService
      .changeUserPassword(this.user.username, this.model)
      .subscribe(
        () => {
          this.router.navigate(['user-list']);
          this.notificationService.success(
            'notification.success.managementEditPassword',
            {
              username: this.user.username,
            }
          );
        },
        (err: any) =>
          this.errorHandlerService.validationErrorHandler(err, this.f)
      );
  }

  cancle() {
    this.location.back();
  }
}
