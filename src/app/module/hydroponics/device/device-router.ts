import { Routes } from '@angular/router';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceCreateComponent } from './device-create/device-create.component';
import { DeviceEditComponent } from './device-edit/device-edit.component';
import { DeviceInfoComponent } from './device-info/device-info.component';
import { AUTHORITIES } from '../../core/authentication/authorities.constants';
import { PermissionGuardService } from '../../core/guards/permission-guard.service';

export const DEVICE_ROUTES: Routes = [
  {
    path: 'device',
    children: [
      {
        path: '',
        component: DeviceListComponent,
        canActivate: [PermissionGuardService],
      },
      {
        path: 'add',
        component: DeviceCreateComponent,
        canActivate: [PermissionGuardService],
        data: {
          allPermissions: [AUTHORITIES.HYDROPONICS_WRITE_DEVICE],
        },
      },
      {
        path: 'edit/:id',
        component: DeviceEditComponent,
        canActivate: [PermissionGuardService],
        data: {
          allPermissions: [AUTHORITIES.HYDROPONICS_WRITE_DEVICE],
        },
      },
      {
        path: 'info/:id',
        component: DeviceInfoComponent,
        canActivate: [PermissionGuardService],
      },
    ],
  },
];
