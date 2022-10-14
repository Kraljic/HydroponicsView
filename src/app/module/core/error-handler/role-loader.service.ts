import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserManagementService } from '../../management/user/user-management.service';
import { Observable, of } from 'rxjs';
import { UserDto } from '../user/user.dto';
import { switchMap, catchError } from 'rxjs/operators';
import { Location } from '@angular/common';
import { NotificationService } from '../../shared/notification/notification.service';
import { ErrorHandlerService } from './error-handler.service';
import { RoleManagementService } from '../../management/role/role-management.service';
import { RoleDto } from '../user/role.dto';

@Injectable({
  providedIn: 'root',
})
export class RoleLoaderService {
  constructor(
    private router: Router,
    private location: Location,
    private roleManagementService: RoleManagementService,
    private notificationService: NotificationService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  tryLoadRoleFromUrl(
    activatedRoute: ActivatedRoute,
    fallback: any[]
  ): Observable<RoleDto> {
    return activatedRoute.paramMap.pipe(
      switchMap((params) => {
        const roleId = parseInt(params.get('roleId'));

        if (!roleId) {
          this.notificationService.error(
            'notification.error.roleIdNotProvided'
          );
          this.goBack();
          return of(null);
        }

        return this.roleManagementService.getRoleById(roleId);
      }),
      catchError((err: any) => {
        this.errorHandlerService.simpleErrorHandler(err);
        this.router.navigate(fallback);
        throw err;
      })
    );
  }

  private goBack(): void {
    this.location.back();
  }
}
