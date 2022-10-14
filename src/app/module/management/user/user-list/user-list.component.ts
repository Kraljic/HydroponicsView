import { Component, OnInit } from '@angular/core';
import * as FAS from '@fortawesome/free-solid-svg-icons';
import * as FAR from '@fortawesome/free-regular-svg-icons';
import { UserDto } from '../../../core/user/user.dto';
import { UserManagementService } from '../user-management.service';
import { NotificationService } from '../../../shared/notification/notification.service';
import { MODAL_DELETE_CONFIG } from '../../../shared/modal/config/delete-config';
import { MODAL_CONFIRM_CONFIG } from '../../../shared/modal/config/confirm-config';
import { UserService } from '../../../core/user/user.service';
import { AUTHORITIES } from '../../../core/authentication/authorities.constants';
import { ErrorHandlerService } from '../../../core/error-handler/error-handler.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles: [],
})
export class UserListComponent implements OnInit {
  MODAL_DELETE_CONFIG = MODAL_DELETE_CONFIG;
  MODAL_CONFIRM_CONFIG = MODAL_CONFIRM_CONFIG;
  FAS = FAS;
  FAR = FAR;

  userList: UserDto[];

  constructor(
    private userManagementService: UserManagementService,
    private notificationService: NotificationService,
    private userService: UserService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.userManagementService
      .getAllUsers()
      .subscribe((users) => (this.userList = users));
  }

  hasUserManagementCreatePermission(): boolean {
    return this.userService.hasAuthority(AUTHORITIES.USERMANAGER_CREATE);
  }

  hasUserManagementWritePermission(): boolean {
    return this.userService.hasAuthority(AUTHORITIES.USERMANAGER_WRITE);
  }

  canLockUsers(): boolean {
    return this.userService.hasAuthority(AUTHORITIES.USERMANAGER_LOCK);
  }

  canAssignRole(): boolean {
    return this.userService.hasAuthority(AUTHORITIES.USERMANAGER_ROLES);
  }

  toggleUserLock(user: UserDto) {
    if (user.writeProtected) {
      this.userManagementService.unlockUser(user.username).subscribe(
        () => (user.writeProtected = false),
        (err) => this.errorHandlerService.simpleErrorHandler(err)
      );
    } else {
      this.userManagementService.lockUser(user.username).subscribe(
        () => (user.writeProtected = true),
        (err) => this.errorHandlerService.simpleErrorHandler(err)
      );
    }
  }

  toggleUserEnabled(user: UserDto) {
    if (user.active) {
      this.userManagementService.disableUser(user.username).subscribe(
        () => (user.active = false),
        (err) => this.errorHandlerService.simpleErrorHandler(err)
      );
    } else {
      this.userManagementService.enableUser(user.username).subscribe(
        () => (user.active = true),
        (err) => this.errorHandlerService.simpleErrorHandler(err)
      );
    }
  }

  deleteUser(user: UserDto) {
    this.userManagementService.deleteUser(user.username).subscribe(
      () => {
        this.userList = this.userList.filter((u) => u.id != user.id);
        this.notificationService.success('notification.success.userDelete', {
          username: user.username,
        });
      },
      (err) => this.errorHandlerService.simpleErrorHandler(err)
    );
  }
}
