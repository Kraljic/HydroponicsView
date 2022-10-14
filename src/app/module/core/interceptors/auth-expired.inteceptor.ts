import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, switchMap, catchError } from 'rxjs/operators';
import { AuthService } from '../authentication/auth.service';
import { HttpClient } from '@angular/common/http';
import { AUTH_URL } from '../authentication/auth-url.constants';

@Injectable()
export class AuthExpiredInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (
          err.status === 401 &&
          request.url != AUTH_URL.LOGIN &&
          request.url != AUTH_URL.LOGOUT &&
          request.url != AUTH_URL.REFRESH
        ) {
          if (this.authService.isAuthenticated()) {
            console.log('Trying to refresh token...');
            return this.authService.refreshAccessToken().pipe(
              switchMap((success: boolean) => {
                if (success) {
                  console.log('Resending request...');
                  return this.http.request(request);
                } else {
                  console.log('Abort...');
                  throw err;
                }
              })
            );
          }

          this.router.navigate(['/login']);
        }

        throw err;
      })
    );
  }
}
