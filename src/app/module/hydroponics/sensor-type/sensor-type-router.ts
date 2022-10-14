import { Routes } from '@angular/router';
import { SensorTypeListComponent } from './sensor-type-list/sensor-type-list.component';
import { SensorTypeCreateComponent } from './sensor-type-create/sensor-type-create.component';
import { SensorTypeEditComponent } from './sensor-type-edit/sensor-type-edit.component';
import { SensorTypeInfoComponent } from './sensor-type-info/sensor-type-info.component';
import { AUTHORITIES } from '../../core/authentication/authorities.constants';
import { PermissionGuardService } from '../../core/guards/permission-guard.service';

export const SENSOR_TYPE_ROUTES: Routes = [
  {
    path: 'sensor-type',
    children: [
      {
        path: '',
        component: SensorTypeListComponent,
        canActivate: [PermissionGuardService],
      },
      {
        path: 'add',
        component: SensorTypeCreateComponent,
        canActivate: [PermissionGuardService],
        data: {
          allPermissions: [AUTHORITIES.HYDROPONICS_WRITE_SENSOR_TYPE],
        },
      },
      {
        path: 'edit/:id',
        component: SensorTypeEditComponent,
        canActivate: [PermissionGuardService],
        data: {
          allPermissions: [AUTHORITIES.HYDROPONICS_WRITE_SENSOR_TYPE],
        },
      },
      {
        path: 'info/:id',
        component: SensorTypeInfoComponent,
        canActivate: [PermissionGuardService],
      },
    ],
  },
];
