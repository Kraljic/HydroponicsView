import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import * as FAS from '@fortawesome/free-solid-svg-icons';
import * as FAR from '@fortawesome/free-regular-svg-icons';
import { UserDto } from '../../../core/user/user.dto';
import { RoleDto } from '../../../core/user/role.dto';
import { UserService } from '../../../core/user/user.service';
import { UserManagementService } from '../user-management.service';
import { NotificationService } from '../../../shared/notification/notification.service';
import { ErrorHandlerService } from '../../../core/error-handler/error-handler.service';
import { UserLoaderService } from '../../../core/error-handler/user-loader.service';
import { MODAL_DELETE_CONFIG } from '../../../shared/modal/config/delete-config';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styles: [],
})
export class UserInfoComponent implements OnInit {
  FAS = FAS;
  FAR = FAR;
  MODAL_DELETE_CONFIG = MODAL_DELETE_CONFIG;

  user: UserDto;
  userRoles: RoleDto[];

  constructor(
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private userLoaderService: UserLoaderService,
    private userService: UserService,
    private userManagementService: UserManagementService,
    private notificationService: NotificationService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.userLoaderService
      .tryLoadUserFromUrl(this.activatedRoute, ['user-list'])
      .subscribe((user: UserDto) => {
        this.user = user;
        this.userRoles = this.user.roles;
      });
  }

  getSortedRoles(): RoleDto[] {
    return this.userRoles.sort((a, b) => a.role.localeCompare(b.role));
  }
  goBack() {
    this.location.back();
  }
  edit() {
    this.router.navigate(['user-edit', this.user.id]);
  }
  delete() {
    this.userManagementService.deleteUser(this.user.username).subscribe(
      () => {
        this.router.navigate(['user-list']);
        this.notificationService.success('notification.success.userDelete', {
          username: this.user.username,
        });
      },
      (err) => this.errorHandlerService.simpleErrorHandler(err)
    );
  }
}
