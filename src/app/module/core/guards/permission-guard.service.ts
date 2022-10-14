import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from '../authentication/auth.service';
import { UserService } from '../user/user.service';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuardService implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    // Provjeri da li je korisnik autentificiran
    if (this.authService.isAuthenticated() == false) {
      this.router.navigate(['/login']);
      return of(false);
    }

    let hasPermission: boolean = true;

    // Ucitaj korisnika
    return this.userService.me().pipe(
      switchMap(() => {
        // Provjeri je li navedena neka dozvola
        if (route.data.anyPermission) {
          hasPermission =
            hasPermission &&
            this.userService.hasAnyAuthority(route.data.anyPermission);
        }
        if (route.data.allPermissions) {
          hasPermission =
            hasPermission &&
            this.userService.hasAllAuthorities(route.data.allPermissions);
        }
        if (route.data.permission) {
          hasPermission =
            hasPermission &&
            this.userService.hasAuthority(route.data.permission);
        }

        // Provjeri zadovoljava li trazene dozvole (preusmjeri ako ne)
        if (hasPermission === false) {
          this.router.navigate(['/forbidden']);
        }

        return of(hasPermission);
      })
    );
  }
}
