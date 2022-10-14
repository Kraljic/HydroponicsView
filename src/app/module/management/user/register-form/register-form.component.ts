import { Component, OnInit } from '@angular/core';
import { RegisterCommand } from './register-command';
import { MULTISELECT_WITH_SEARCH } from '../../../shared/dropdown/dorpdown.config';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { RoleDto } from '../../../core/user/role.dto';
import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { NotificationService } from '../../../shared/notification/notification.service';
import { getRegisterFormValidator } from './register-form.validator';
import { DropdownConfigService } from '../../../shared/dropdown/dropdown-config.service';
import { UserManagementService } from '../user-management.service';
import { RoleManagementService } from '../../role/role-management.service';
import { UserDto } from '../../../core/user/user.dto';
import { bindValidationErrors } from '../../../core/validation-error/bind-validation-errors';
import { VALIDATION_ERROR_MESSAGE } from '../../../core/validation-error/server-validation-error.const';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../../../core/error-handler/error-handler.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styles: [],
})
export class RegisterFormComponent implements OnInit {
  registerCommand: RegisterCommand;
  multiselectSettings: IDropdownSettings;

  formGroup: FormGroup;
  rolesList: RoleDto[] = [];
  rolesSelected: RoleDto[] = [];

  saving: boolean = false;

  constructor(
    private location: Location,
    private router: Router,
    private dropdownConfigService: DropdownConfigService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private userManagementService: UserManagementService,
    private roleManagementService: RoleManagementService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.registerCommand = new RegisterCommand();

    this.formGroup = getRegisterFormValidator(this.formBuilder);

    this.dropdownConfigService
      .build('id', 'role', MULTISELECT_WITH_SEARCH)
      .subscribe((settings) => (this.multiselectSettings = settings));

    this.roleManagementService.getAllRoles().subscribe((roles: RoleDto[]) => {
      this.rolesList = roles;
    });
  }

  get f() {
    return this.formGroup.controls;
  }
  get model() {
    return this.registerCommand;
  }

  rolesOnItemSelect(e: any) {}

  save() {
    this.model.roles = this.rolesSelected.map((r) => r.id) || [];

    this.userManagementService.createNewUser(this.model).subscribe(
      (newUser: UserDto) => {
        this.router.navigate(['user-list']);
        this.notificationService.success('notification.success.userAdd', {
          username: newUser.username,
        });
      },
      (err: any) => this.errorHandlerService.validationErrorHandler(err, this.f)
    );
  }

  cancle() {
    this.location.back();
  }
}
