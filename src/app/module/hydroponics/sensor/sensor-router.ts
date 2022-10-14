import { Routes } from '@angular/router';
import { SensorListComponent } from './sensor-list/sensor-list.component';
import { SensorCreateComponent } from './sensor-create/sensor-create.component';
import { SensorEditComponent } from './sensor-edit/sensor-edit.component';
import { SensorInfoComponent } from './sensor-info/sensor-info.component';
import { AUTHORITIES } from '../../core/authentication/authorities.constants';
import { PermissionGuardService } from '../../core/guards/permission-guard.service';
import { SensorVariableFormComponent } from './sensor-variable-form/sensor-variable-form.component';

export const SENSOR_ROUTES: Routes = [
  {
    path: 'sensor',
    children: [
      {
        path: '',
        component: SensorListComponent,
        canActivate: [PermissionGuardService],
      },
      {
        path: 'add',
        component: SensorCreateComponent,
        canActivate: [PermissionGuardService],
        data: {
          allPermissions: [AUTHORITIES.HYDROPONICS_WRITE_SENSOR],
        },
      },
      {
        path: 'edit/:id',
        component: SensorEditComponent,
        canActivate: [PermissionGuardService],
        data: {
          allPermissions: [AUTHORITIES.HYDROPONICS_WRITE_SENSOR],
        },
      },
      {
        path: 'edit-variable/:id',
        component: SensorVariableFormComponent,
        canActivate: [PermissionGuardService],
        data: {
          allPermissions: [AUTHORITIES.HYDROPONICS_WRITE_SENSOR_VARIABLE],
        },
      },
      {
        path: 'info/:id',
        component: SensorInfoComponent,
        canActivate: [PermissionGuardService],
      },
    ],
  },
];
