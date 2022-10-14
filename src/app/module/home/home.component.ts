import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/authentication/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../core/user/user.service';
import { UserDto } from '../core/user/user.dto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['login']);
    } else {
      this.showWeatherWidget();
    }
  }

  getUser(): UserDto {
    return this.userService.getUser();
  }

  showWeatherWidget() {
    let js,
      fjs = document.getElementsByClassName('weatherwidget')[0];
    if (!document.getElementById('weatherwidget-io-js')) {
      js = document.createElement('script');
      js.id = 'weatherwidget-io-js';
      js.src = 'https://weatherwidget.io/js/widget.min.js';
      fjs.parentNode.insertBefore(js, fjs);
    }
  }
}
