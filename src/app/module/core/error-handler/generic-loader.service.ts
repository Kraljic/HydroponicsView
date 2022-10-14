import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NotificationService } from '../../shared/notification/notification.service';
import { ErrorHandlerService } from './error-handler.service';
import { Observable } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GenericLoaderService {
  constructor(
    private router: Router,
    private errorHandlerService: ErrorHandlerService
  ) {}

  tryLoadObjectFromUrl<T>(
    activatedRoute: ActivatedRoute,
    serviceFunction: (id: string) => Observable<T>,
    fallback: any[]
  ): Observable<T> {
    const id = activatedRoute.snapshot.paramMap.get('id');

    return serviceFunction(id).pipe(
      catchError((err: any) => {
        this.errorHandlerService.simpleErrorHandler(err);
        this.router.navigate(fallback);
        throw err;
      })
    );
  }
}
