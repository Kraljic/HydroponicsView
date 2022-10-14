import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserManagementService } from '../../management/user/user-management.service';
import { Observable, of } from 'rxjs';
import { UserDto } from '../user/user.dto';
import { switchMap, catchError } from 'rxjs/operators';
import { Location } from '@angular/common';
import { NotificationService } from '../../shared/notification/notification.service';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class UserLoaderService {
  constructor(
    private router: Router,
    private location: Location,
    private userManagementService: UserManagementService,
    private notificationService: NotificationService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  tryLoadUserFromUrl(
    activatedRoute: ActivatedRoute,
    fallback: any[]
  ): Observable<UserDto> {
    return activatedRoute.paramMap.pipe(
      switchMap((params) => {
        const username = params.get('username');
        console.log(username);
        console.log(params);
        if (!username) {
          this.notificationService.error(
            'notification.error.usernameNotProvided'
          );
          this.goBack();
          return of(null);
        }

        return this.userManagementService.getUserByUsername(username);
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
