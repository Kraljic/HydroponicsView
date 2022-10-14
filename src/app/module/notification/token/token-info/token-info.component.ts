import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service';
import { NotificationAccessTokenDto } from '../../_model/notification-access-token-dto';
import { ErrorHandlerService } from '../../../core/error-handler/error-handler.service';
import { MODAL_CONFIRM_CONFIG } from 'src/app/module/shared/modal/config/confirm-config';

@Component({
  selector: 'app-token-info',
  templateUrl: './token-info.component.html',
  styles: [],
})
export class TokenInfoComponent implements OnInit {
  MODAL_CONFIRM_CONFIG = MODAL_CONFIRM_CONFIG;

  token: String;
  showToken: boolean = false;

  constructor(
    private tokenService: TokenService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.tokenService.getToken().subscribe(
      (token) => (this.token = token.token),
      (err) => this.errorHandlerService.simpleErrorHandler(err)
    );
  }

  toggleTokenShow() {
    this.showToken = !this.showToken;
  }

  resetToken() {
    this.tokenService.resetToken().subscribe(
      (token) => (this.token = token.token),
      (err) => this.errorHandlerService.simpleErrorHandler(err)
    );
  }

  copyToken(inputElement) {
    inputElement.select();
    inputElement.type = 'text';
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);

    inputElement.type = this.showToken ? 'text' : 'password';
  }
}
