import { Component, OnInit } from '@angular/core';
import { LoginCommand } from '../authentication/login.command';
import { AuthService } from '../authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  authenticating = false;
  loginFailed = false;

  loginForm: LoginCommand;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new LoginCommand();

    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  login() {
    this.authenticating = true;
    this.loginFailed = false;

    this.authService
      .login(this.loginForm)
      .subscribe(
        () => this.successfulLogin(),
        () => (this.loginFailed = true)
      )
      .add(() => (this.authenticating = false));
  }

  successfulLogin() {
    this.router.navigate(['/']);
  }
}
