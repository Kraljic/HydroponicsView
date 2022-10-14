import { Routes } from '@angular/router';
import { AUTHORITIES } from '../../../core/authentication/authorities.constants';
import { TopicInfoComponent } from './topic-info/topic-info.component';
import { PermissionGuardService } from '../../../core/guards/permission-guard.service';
import { UserTopicFormComponent } from './user-topic-form/user-topic-form.component';

export const TOPIC_MANAGEMENT_ROUTES: Routes = [
  {
    path: 'topic-management',
    data: {
      allPermissions: [
        AUTHORITIES.TOPICMANAGER_ACCESS,
        AUTHORITIES.TOPICMANAGER_READ,
      ],
    },
    children: [
      {
        path: 'edit/:username',
        component: UserTopicFormComponent,
        canActivate: [PermissionGuardService],
        data: {
          allPermissions: [AUTHORITIES.TOPICMANAGER_WRITE],
        },
      },
      {
        path: 'info',
        component: TopicInfoComponent,
        canActivate: [PermissionGuardService],
      },
    ],
  },
];
