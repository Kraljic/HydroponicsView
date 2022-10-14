import { Component, OnInit } from '@angular/core';
import { UserTopicDto } from '../../../_model/user-topic-dto';
import { TopicManagementService } from '../topic-management.service';
import { ErrorHandlerService } from '../../../../core/error-handler/error-handler.service';
import { UserService } from '../../../../core/user/user.service';
import { AUTHORITIES } from '../../../../core/authentication/authorities.constants';
import * as FAS from '@fortawesome/free-solid-svg-icons';
import * as FAR from '@fortawesome/free-regular-svg-icons';
import { NotificationService } from '../../../../shared/notification/notification.service';
import { MODAL_CONFIRM_CONFIG } from 'src/app/module/shared/modal/config/confirm-config';

@Component({
  selector: 'app-topic-info',
  templateUrl: './topic-info.component.html',
  styles: [],
})
export class TopicInfoComponent implements OnInit {
  FAS = FAS;
  FAR = FAR;
  MODAL_CONFIRM_CONFIG = MODAL_CONFIRM_CONFIG;

  userTopicsList: UserTopicDto[];

  constructor(
    private userService: UserService,
    private topicManagementService: TopicManagementService,
    private notificationService: NotificationService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.topicManagementService.findAllUsersTopic().subscribe(
      (userTopicsList) => (this.userTopicsList = userTopicsList),
      (err) => this.errorHandlerService.simpleErrorHandler(err)
    );
  }

  canManageTopics(): boolean {
    return this.userService.hasAuthority(AUTHORITIES.TOPICMANAGER_WRITE);
  }

  rebuild() {
    this.topicManagementService.rebuildTopicList().subscribe(
      () =>
        this.notificationService.success(
          'notification.success.topicManagementInfo.rebuild'
        ),
      (err) => this.errorHandlerService.simpleErrorHandler(err)
    );
  }

  resetTopicKeys() {
    this.topicManagementService.resetTopicKeys().subscribe(
      () =>
        this.notificationService.success(
          'notification.success.topicManagementInfo.resetKeys'
        ),
      (err) => this.errorHandlerService.simpleErrorHandler(err)
    );
  }
}
