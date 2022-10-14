import { Component, OnInit } from '@angular/core';
import * as FAS from '@fortawesome/free-solid-svg-icons';
import * as FAR from '@fortawesome/free-regular-svg-icons';
import { RoleDto } from '../../../core/user/role.dto';
import { MODAL_DELETE_CONFIG } from 'src/app/module/shared/modal/config/delete-config';
import { RoleManagementService } from '../role-management.service';
import { ErrorHandlerService } from '../../../core/error-handler/error-handler.service';
import { NotificationService } from '../../../shared/notification/notification.service';
import { UserService } from '../../../core/user/user.service';
import { AUTHORITIES } from '../../../core/authentication/authorities.constants';
import { MODAL_CONFIRM_CONFIG } from 'src/app/module/shared/modal/config/confirm-config';
import { AuthorityDto } from '../../../core/user/authority.dto';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styles: [],
})
export class RoleListComponent implements OnInit {
  FAS = FAS;
  FAR = FAR;
  MODAL_DELETE_CONFIG = MODAL_DELETE_CONFIG;
  MODAL_CONFIRM_CONFIG = MODAL_CONFIRM_CONFIG;

  roleList: RoleDto[];

  constructor(
    private roleManagementService: RoleManagementService,
    private notificationService: NotificationService,
    private errorHandlerService: ErrorHandlerService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.roleManagementService.getAllRoles().subscribe((roles: RoleDto[]) => {
      this.roleList = roles;
    });
  }

  hasRoleManagementWritePermission(): boolean {
    return this.userService.hasAuthority(AUTHORITIES.ROLEMANAGER_WRITE);
  }

  filterAccessPermissions(authorities: AuthorityDto[]): string[] {
    let firstThree = authorities.slice(0, 2).map((a) => a.authority);
    if (firstThree.length < authorities.length) {
      firstThree.push('...');
    }
    return firstThree;
  }

  canLockRoles(): boolean {
    return this.userService.hasAuthority(AUTHORITIES.ROLEMANAGER_LOCK);
  }

  toggleRoleLock(role: RoleDto) {
    if (role.locked) {
      this.roleManagementService.unlockRole(role.id).subscribe(
        () => (role.locked = false),
        (err) => this.errorHandlerService.simpleErrorHandler(err)
      );
    } else {
      this.roleManagementService.lockRole(role.id).subscribe(
        () => (role.locked = true),
        (err) => this.errorHandlerService.simpleErrorHandler(err)
      );
    }
  }

  deleteRole(role: RoleDto) {
    this.roleManagementService.deleteRole(role.id).subscribe(
      () => {
        this.roleList = this.roleList.filter((r) => r.id != role.id);
        this.notificationService.success('notification.success.roleDelete', {
          role: role.role,
        });
      },
      (err) => this.errorHandlerService.simpleErrorHandler(err)
    );
  }
}
