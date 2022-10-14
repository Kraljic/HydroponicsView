import { Component, OnInit } from '@angular/core';
import { RoleLoaderService } from '../../../core/error-handler/role-loader.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleDto } from '../../../core/user/role.dto';
import * as FAS from '@fortawesome/free-solid-svg-icons';
import * as FAR from '@fortawesome/free-regular-svg-icons';
import { Location } from '@angular/common';
import { RoleManagementService } from '../role-management.service';
import { NotificationService } from '../../../shared/notification/notification.service';
import { ErrorHandlerService } from '../../../core/error-handler/error-handler.service';
import { UserDto } from '../../../core/user/user.dto';
import { UserManagementService } from '../../user/user-management.service';
import { UserService } from '../../../core/user/user.service';
import { AUTHORITIES } from '../../../core/authentication/authorities.constants';
import { MODAL_DELETE_CONFIG } from 'src/app/module/shared/modal/config/delete-config';

@Component({
  selector: 'app-role-info',
  templateUrl: './role-info.component.html',
  styles: [],
})
export class RoleInfoComponent implements OnInit {
  FAS = FAS;
  FAR = FAR;
  MODAL_DELETE_CONFIG = MODAL_DELETE_CONFIG;

  role: RoleDto;
  roleUsers: UserDto[];

  constructor(
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private roleLoaderService: RoleLoaderService,
    private userService: UserService,
    private roleManagementService: RoleManagementService,
    private userManagementService: UserManagementService,
    private notificationService: NotificationService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.roleLoaderService
      .tryLoadRoleFromUrl(this.activatedRoute, ['role-list'])
      .subscribe((role: RoleDto) => {
        this.role = role;
        if (this.userService.hasAuthority(AUTHORITIES.USERMANAGER_READ)) {
          this.userManagementService
            .getAllUsersByRoleId(this.role.id)
            .subscribe((users: UserDto[]) => {
              this.roleUsers = users;
            });
        }
      });
  }

  getSortedPermissions(): string[] {
    return this.role.authorities.map((a) => a.authority).sort();
  }
  goBack() {
    this.location.back();
  }
  edit() {
    this.router.navigate(['role-edit', this.role.id]);
  }
  delete() {
    this.roleManagementService.deleteRole(this.role.id).subscribe(
      () => {
        this.router.navigate(['role-list']);
        this.notificationService.success('notification.success.roleDelete', {
          role: this.role.role,
        });
      },
      (err) => this.errorHandlerService.simpleErrorHandler(err)
    );
  }
}
