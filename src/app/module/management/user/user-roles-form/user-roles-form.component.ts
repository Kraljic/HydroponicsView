import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from '../../../core/error-handler/error-handler.service';
import { RoleManagementService } from '../../role/role-management.service';
import { UserManagementService } from '../user-management.service';
import { NotificationService } from '../../../shared/notification/notification.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DropdownConfigService } from '../../../shared/dropdown/dropdown-config.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserRolesCommand } from './user-roles-command';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { RoleDto } from '../../../core/user/role.dto';
import { getUserRolesFormValidator } from './user-roles.validation';
import { MULTISELECT_WITH_SEARCH } from '../../../shared/dropdown/dorpdown.config';
import { UserDto } from '../../../core/user/user.dto';
import { UserLoaderService } from '../../../core/error-handler/user-loader.service';

@Component({
  selector: 'app-user-roles-form',
  templateUrl: './user-roles-form.component.html',
  styles: [],
})
export class UserRolesFormComponent implements OnInit {
  userRolesCommand: UserRolesCommand;
  multiselectSettings: IDropdownSettings;

  user: UserDto;

  formGroup: FormGroup;
  rolesList: RoleDto[] = [];
  rolesSelected: RoleDto[] = [];

  saving: boolean = false;

  constructor(
    private location: Location,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dropdownConfigService: DropdownConfigService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private userManagementService: UserManagementService,
    private roleManagementService: RoleManagementService,
    private errorHandlerService: ErrorHandlerService,
    private userLoaderService: UserLoaderService
  ) {}

  ngOnInit(): void {
    this.userRolesCommand = new UserRolesCommand();

    this.userLoaderService
      .tryLoadUserFromUrl(this.activatedRoute, ['user-list'])
      .subscribe((user: UserDto) => {
        this.user = user;
        this.rolesSelected = user.roles;
        this.userRolesCommand.username = this.user.username;
      });

    this.formGroup = getUserRolesFormValidator(this.formBuilder);

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
    return this.userRolesCommand;
  }

  rolesOnItemSelect(e: any) {}

  save() {
    this.model.roles = this.rolesSelected.map((r) => r.id) || [];

    this.userManagementService
      .assignRoles(this.user.username, this.model)
      .subscribe(
        (user: UserDto) => {
          this.router.navigate(['user-list']);
          this.notificationService.success(
            'notification.success.userRolesAssign',
            { username: this.user.username }
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
