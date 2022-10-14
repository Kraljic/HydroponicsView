import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      !request ||
      !request.url ||
      !(environment.apiUrl && request.url.startsWith(environment.apiUrl))
    ) {
      return next.handle(request);
    }

    const token = localStorage.getItem('accessToken');
    const tokenType = localStorage.getItem('tokenType');

    if (token && tokenType) {
      request = request.clone({
        setHeaders: {
          Authorization: tokenType + ' ' + token,
        },
      });
    }

    // add content type
    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
        },
      });
    }
    return next.handle(request);
  }
}
