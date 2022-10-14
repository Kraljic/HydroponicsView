import { Component, OnInit } from '@angular/core';
import * as FAS from '@fortawesome/free-solid-svg-icons';
import * as FAR from '@fortawesome/free-regular-svg-icons';
import { TOKEN_PATH_FULL } from '../token/token-path';
import { TOPIC_MANAGEMENT_PATH_FULL } from '../management/topic/topic-management-path';
import { UserService } from '../../core/user/user.service';
import { AUTHORITIES } from '../../core/authentication/authorities.constants';

@Component({
  selector: 'app-notification-navigation-dropdown',
  templateUrl: './notification-navigation-dropdown.component.html',
  styles: [],
})
export class NotificationNavigationDropdownComponent implements OnInit {
  FAS = FAS;
  FAR = FAR;
  AUTHORITIES = AUTHORITIES;
  TOKEN_PATH_FULL = TOKEN_PATH_FULL;
  TOPIC_MANAGEMENT_PATH_FULL = TOPIC_MANAGEMENT_PATH_FULL;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  hasAccess(authority: string): boolean {
    return this.userService.hasAuthority(authority);
  }
}
