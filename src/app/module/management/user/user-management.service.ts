import { Injectable } from '@angular/core';
import { UserDto } from '../../core/user/user.dto';
import { Observable, of } from 'rxjs';
import { RegisterCommand } from './register-form/register-command';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { PasswordManagementCommand } from './password-management-form/password-management-command';
import { UserRolesCommand } from './user-roles-form/user-roles-command';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  userManagementUrl = environment.apiUrl + '/management/api/user';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(this.userManagementUrl);
  }

  getAllUsersByRoleId(roleId: number): Observable<UserDto[]> {
    return this.http.get<UserDto[]>(
      `${this.userManagementUrl}/byRoleId/${roleId}`
    );
  }

  getUserByUsername(username: string): Observable<UserDto> {
    return this.http.get<UserDto>(
      `${this.userManagementUrl}/username/${username}`
    );
  }

  createNewUser(registerUserCommand: RegisterCommand): Observable<UserDto> {
    return this.http.post<UserDto>(
      `${this.userManagementUrl}/create`,
      registerUserCommand,
      this.httpOptions
    );
  }

  deleteUser(username: string): Observable<any> {
    return this.http.delete(`${this.userManagementUrl}/delete/${username}`);
  }

  changeUserPassword(
    username: string,
    passwordManagementCommand: PasswordManagementCommand
  ): Observable<any> {
    return this.http.put(
      `${this.userManagementUrl}/password/${username}`,
      passwordManagementCommand,
      this.httpOptions
    );
  }

  enableUser(username: string): Observable<any> {
    return this.http.get(`${this.userManagementUrl}/enable/${username}`);
  }

  disableUser(username: string): Observable<any> {
    return this.http.get(`${this.userManagementUrl}/disable/${username}`);
  }

  lockUser(username: string): Observable<any> {
    return this.http.get(`${this.userManagementUrl}/lock/${username}`);
  }

  unlockUser(username: string): Observable<any> {
    return this.http.get(`${this.userManagementUrl}/unlock/${username}`);
  }

  assignRoles(
    username: string,
    userRoleCommand: UserRolesCommand
  ): Observable<UserDto> {
    return this.http.put<UserDto>(
      `${this.userManagementUrl}/roles/${username}`,
      userRoleCommand,
      this.httpOptions
    );
  }
}
