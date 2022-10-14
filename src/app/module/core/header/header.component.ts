import { Component, OnInit } from '@angular/core';
import { AUTHORITIES } from '../authentication/authorities.constants';
import * as FAS from '@fortawesome/free-solid-svg-icons';
import * as FAR from '@fortawesome/free-regular-svg-icons';
import { AuthService } from '../authentication/auth.service';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  FAS = FAS;
  FAR = FAR;
  AUTHORITIES = AUTHORITIES;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.logoutEvent.subscribe(() => {
      this.router.navigate(['login']);
    });
  }

  getUsername() {
    return this.userService.getUser()?.username;
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
  }

  hasAnyAccess(...args: string[]): boolean {
    return this.userService.hasAnyAuthority(args);
  }
  hasAllAccess(...args: string[]): boolean {
    return this.userService.hasAllAuthorities(args);
  }
  hasAccess(authority: string): boolean {
    return this.userService.hasAuthority(authority);
  }
}
