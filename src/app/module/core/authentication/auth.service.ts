import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginCommand } from './login.command';
import { TokenDto } from './token.dto';
import { AUTH_URL } from './auth-url.constants';
import { tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserDto } from '../user/user.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginEvent: EventEmitter<any> = new EventEmitter<any>();
  loginErrorEvent: EventEmitter<any> = new EventEmitter<any>();
  logoutEvent: EventEmitter<any> = new EventEmitter<any>();

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true,
  };

  private refreshInProgress: boolean;
  private tokenRefreshed: EventEmitter<boolean>;

  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    return localStorage.getItem('auth') === 'true';
  }

  validateToken(): Observable<UserDto> {
    return this.http.get<UserDto>(AUTH_URL.VALIDATE);
  }

  login(login: LoginCommand) {
    if (this.isAuthenticated()) {
      return this.refreshAccessToken();
    }

    return this.http
      .post<TokenDto>(AUTH_URL.LOGIN, login, this.httpOptions)
      .pipe(
        tap((token: TokenDto) => this.handleNewToken(token)),
        catchError((error: any) => this.handleAuthError(error))
      );
  }

  refreshAccessToken() {
    if (this.refreshInProgress) {
      return this.tokenRefreshed;
    }

    // Izolirati refresh token zahtjev od ostatka aplikacije,
    // svaki refresh token zahtjev ponistava prethodni token
    // svaki .subscribe() poziv salje novi zahtjev
    console.log('Creating refresh token request..');
    this.refreshInProgress = true;
    this.http
      .post<TokenDto>(AUTH_URL.REFRESH, {}, this.httpOptions)
      .pipe(
        tap((token: TokenDto) => this.handleNewToken(token)),
        catchError((error: any) => this.handleAuthError(error))
      )
      .subscribe(
        () => this.tokenRefreshed.emit(true), // emitiraj da je refresh token dohvacen uspjesno
        () => this.tokenRefreshed.emit(false), // emitiraj da refresh token nije dohvacen uspjesno
        () => (this.refreshInProgress = false)
      );

    this.tokenRefreshed = new EventEmitter<boolean>();
    return this.tokenRefreshed;
  }

  logout() {
    if (this.isAuthenticated() == false) {
      return;
    }

    this.http
      .post(AUTH_URL.LOGOUT, {}, this.httpOptions)
      .subscribe()
      .add(() => {
        localStorage.removeItem('auth');
        this.logoutEvent.emit();
      });
  }

  private handleNewToken(token: TokenDto) {
    localStorage.setItem('accessToken', token.accessToken);
    localStorage.setItem('tokenType', token.tokenType);
    localStorage.setItem('auth', 'true');

    this.loginEvent.emit();
  }

  private handleAuthError(error: any): any {
    localStorage.removeItem('auth');
    this.loginErrorEvent.emit(error);

    throw error;
  }
}
