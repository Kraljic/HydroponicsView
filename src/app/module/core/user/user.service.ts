import { Injectable, OnInit } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { Observable, of } from 'rxjs';
import { UserDto } from './user.dto';
import { tap, catchError } from 'rxjs/operators';
import { ProfileDto } from './profile.dto';
import { ProfileCommand } from '../../user/profile-form/profile-command';
import { PasswordCommand } from '../../user/password-form/password-command';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  userUrl = environment.apiUrl + '/api/user';

  private user: UserDto;

  constructor(private authService: AuthService, private http: HttpClient) {
    this.authService.loginEvent.subscribe(() => {
      this.me().subscribe();
    });
    this.authService.logoutEvent.subscribe(() => {
      this.user = null;
    });

    this.me().subscribe();
  }

  getUser(): UserDto {
    return this.user;
  }

  me(): Observable<UserDto> {
    if (this.user) {
      return of(this.user);
    }

    return this.http.get<UserDto>(`${this.userUrl}/me`).pipe(
      tap((user: UserDto) => {
        this.user = user;
      })
    );
  }

  getProfile(): Observable<ProfileDto> {
    return this.http.get<ProfileDto>(`${this.userUrl}/profile`);
  }

  updateProfile(profileCommand: ProfileCommand): Observable<ProfileDto> {
    return this.http.put<ProfileDto>(
      `${this.userUrl}/profile`,
      profileCommand,
      this.httpOptions
    );
  }

  updatePassword(passwordCommand: PasswordCommand): Observable<any> {
    return this.http.put(
      `${this.userUrl}/password`,
      passwordCommand,
      this.httpOptions
    );
  }

  hasAuthority(authority: string): boolean {
    return this.user?.authorities.includes(authority);
  }

  hasAnyAuthority(authorities: string[]): boolean {
    return authorities.some((a) => this.user?.authorities.includes(a));
  }

  hasAllAuthorities(authorities: string[]): boolean {
    return authorities.every((a) => this.user?.authorities.includes(a));
  }
}
