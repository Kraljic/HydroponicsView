import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoleDto } from '../../core/user/role.dto';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AuthorityDto } from '../../core/user/authority.dto';
import { RoleCommand } from './role-form/role-command';

@Injectable({
  providedIn: 'root',
})
export class RoleManagementService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  roleManagementUrl = environment.apiUrl + '/management/api/role';
  authorityManagementUrl = environment.apiUrl + '/management/api/authority';

  constructor(private http: HttpClient) {}

  getAllRoles(): Observable<RoleDto[]> {
    return this.http.get<RoleDto[]>(this.roleManagementUrl);
  }

  getAllAuthorities(): Observable<AuthorityDto[]> {
    return this.http.get<AuthorityDto[]>(this.authorityManagementUrl);
  }

  getRoleById(roleId: number): Observable<RoleDto> {
    return this.http.get<RoleDto>(`${this.roleManagementUrl}/${roleId}`);
  }

  creatRole(roleCommand: RoleCommand): Observable<RoleDto> {
    return this.http.post<RoleDto>(
      this.roleManagementUrl,
      roleCommand,
      this.httpOptions
    );
  }

  updateRole(roleId: number, roleCommand: RoleCommand): Observable<RoleDto> {
    return this.http.put<RoleDto>(
      `${this.roleManagementUrl}/${roleId}`,
      roleCommand,
      this.httpOptions
    );
  }

  deleteRole(roleId: number): Observable<any> {
    return this.http.delete(`${this.roleManagementUrl}/${roleId}`);
  }

  lockRole(roleId: number): Observable<any> {
    return this.http.get(`${this.roleManagementUrl}/lock/${roleId}`);
  }

  unlockRole(roleId: number): Observable<any> {
    return this.http.get(`${this.roleManagementUrl}/unlock/${roleId}`);
  }
}
