import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { AuthService } from '../authentication/auth.service';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return of(this.checkLogin());
  }

  checkLogin(): boolean {
    let isLoggedIn = this.authService.isAuthenticated();
    if (isLoggedIn == false) {
      this.router.navigate(['/login']);
    }
    return isLoggedIn;
  }
}
