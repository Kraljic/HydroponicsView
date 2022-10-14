import { Routes } from '@angular/router';
import { PermissionGuardService } from '../../core/guards/permission-guard.service';
import { TokenInfoComponent } from './token-info/token-info.component';
import { AUTHORITIES } from '../../core/authentication/authorities.constants';

export const TOKEN_ROUTES: Routes = [
  {
    path: 'token',
    data: {
      allPermissions: [AUTHORITIES.NOTIFICATION_ACCESS],
    },
    children: [
      {
        path: 'info',
        component: TokenInfoComponent,
        canActivate: [PermissionGuardService],
      },
    ],
  },
];
