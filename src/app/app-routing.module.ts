import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './module/core/login/login.component';
import { HomeComponent } from './module/home/home.component';
import { AuthGuardService } from './module/core/guards/auth-guard.service';
import { RegisterFormComponent } from './module/management/user/register-form/register-form.component';
import { UserListComponent } from './module/management/user/user-list/user-list.component';
import { AUTHORITIES } from './module/core/authentication/authorities.constants';
import { PermissionGuardService } from './module/core/guards/permission-guard.service';
import { ForbiddenComponent } from './module/core/forbidden/forbidden.component';
import { NotFoundComponent } from './module/core/not-found/not-found.component';
import { PasswordManagementFormComponent } from './module/management/user/password-management-form/password-management-form.component';
import { PasswordFormComponent } from './module/user/password-form/password-form.component';
import { ProfileFormComponent } from './module/user/profile-form/profile-form.component';
import { UserRolesFormComponent } from './module/management/user/user-roles-form/user-roles-form.component';
import { RoleListComponent } from './module/management/role/role-list/role-list.component';
import { RoleEditComponent } from './module/management/role/role-edit/role-edit.component';
import { RoleCreateComponent } from './module/management/role/role-create/role-create.component';
import { RoleInfoComponent } from './module/management/role/role-info/role-info.component';
import { UserInfoComponent } from './module/management/user/user-info/user-info.component';
import { DEVICE_ROUTES } from './module/hydroponics/device/device-router';
import { SENSOR_TYPE_ROUTES } from './module/hydroponics/sensor-type/sensor-type-router';
import { SENSOR_ROUTES } from './module/hydroponics/sensor/sensor-router';
import {
  HYDROPONIC_MODULE_BASE_ROUTE,
  HYDROPONIC_MODULE_BASE_ROUTE_WITHOUT_SLASH,
} from './module/hydroponics/module-route-name';
import {
  NOTIFICATION_MODULE_BASE_ROUTE,
  NOTIFICATION_MODULE_BASE_ROUTE_WITHOUT_SLASH,
} from './module/notification/module-route-name.ts';
import { TOKEN_ROUTES } from './module/notification/token/token-router';
import { TOPIC_MANAGEMENT_ROUTES } from './module/notification/management/topic/topic-management-router';

const routes: Routes = [
  {
    path: 'main',
    component: HomeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profile-edit',
    component: ProfileFormComponent,
    canActivate: [PermissionGuardService],
    data: {
      allPermissions: [AUTHORITIES.USER_ACCESS, AUTHORITIES.USER_WRITE],
    },
  },
  {
    path: 'password-edit',
    component: PasswordFormComponent,
    canActivate: [PermissionGuardService],
    data: {
      allPermissions: [AUTHORITIES.USER_ACCESS, AUTHORITIES.USER_WRITE],
    },
  },
  {
    path: 'password-edit/:username',
    component: PasswordManagementFormComponent,
    canActivate: [PermissionGuardService],
    data: {
      allPermissions: [
        AUTHORITIES.USERMANAGER_ACCESS,
        AUTHORITIES.USERMANAGER_WRITE,
      ],
    },
  },
  {
    path: 'user-list',
    component: UserListComponent,
    canActivate: [PermissionGuardService],
    data: {
      allPermissions: [
        AUTHORITIES.USERMANAGER_ACCESS,
        AUTHORITIES.USERMANAGER_READ,
      ],
    },
  },
  {
    path: 'user-info/:username',
    component: UserInfoComponent,
    canActivate: [PermissionGuardService],
    data: {
      allPermissions: [
        AUTHORITIES.USERMANAGER_ACCESS,
        AUTHORITIES.USERMANAGER_READ,
      ],
    },
  },
  {
    path: 'user-add',
    component: RegisterFormComponent,
    canActivate: [PermissionGuardService],
    data: {
      allPermissions: [
        AUTHORITIES.USERMANAGER_ACCESS,
        AUTHORITIES.USERMANAGER_CREATE,
      ],
    },
  },
  {
    path: 'password-edit/:username',
    component: PasswordManagementFormComponent,
    canActivate: [PermissionGuardService],
    data: {
      allPermissions: [
        AUTHORITIES.USERMANAGER_ACCESS,
        AUTHORITIES.USERMANAGER_WRITE,
      ],
    },
  },
  {
    path: 'roles-edit/:username',
    component: UserRolesFormComponent,
    canActivate: [PermissionGuardService],
    data: {
      allPermissions: [
        AUTHORITIES.USERMANAGER_ACCESS,
        AUTHORITIES.USERMANAGER_ROLES,
      ],
    },
  },

  {
    path: 'role-list',
    component: RoleListComponent,
    canActivate: [PermissionGuardService],
    data: {
      allPermissions: [
        AUTHORITIES.ROLEMANAGER_ACCESS,
        AUTHORITIES.ROLEMANAGER_READ,
      ],
    },
  },
  {
    path: 'role-info/:roleId',
    component: RoleInfoComponent,
    canActivate: [PermissionGuardService],
    data: {
      allPermissions: [
        AUTHORITIES.ROLEMANAGER_ACCESS,
        AUTHORITIES.ROLEMANAGER_READ,
      ],
    },
  },
  {
    path: 'role-add',
    component: RoleCreateComponent,
    canActivate: [PermissionGuardService],
    data: {
      allPermissions: [
        AUTHORITIES.ROLEMANAGER_ACCESS,
        AUTHORITIES.ROLEMANAGER_WRITE,
      ],
    },
  },
  {
    path: 'role-edit/:roleId',
    component: RoleEditComponent,
    canActivate: [PermissionGuardService],
    data: {
      allPermissions: [
        AUTHORITIES.ROLEMANAGER_ACCESS,
        AUTHORITIES.ROLEMANAGER_WRITE,
      ],
    },
  },
  {
    path: HYDROPONIC_MODULE_BASE_ROUTE_WITHOUT_SLASH,
    canActivate: [PermissionGuardService],
    children: []
      .concat(DEVICE_ROUTES)
      .concat(SENSOR_ROUTES)
      .concat(SENSOR_TYPE_ROUTES),

    data: {
      allPermissions: [
        AUTHORITIES.HYDROPONICS_ACCESS,
        AUTHORITIES.HYDROPONICS_READ,
      ],
    },
  },
  {
    path: NOTIFICATION_MODULE_BASE_ROUTE_WITHOUT_SLASH,
    canActivate: [PermissionGuardService],
    children: [].concat(TOKEN_ROUTES).concat(TOPIC_MANAGEMENT_ROUTES),
    data: {
      anyPermissions: [
        AUTHORITIES.NOTIFICATION_ACCESS,
        AUTHORITIES.TOPICMANAGER_ACCESS,
      ],
    },
  },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
