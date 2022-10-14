import { Component, OnInit, Input } from '@angular/core';
import { UserTopicDto } from '../../../_model/user-topic-dto';
import { TOPIC_MANAGEMENT_PATH_FULL } from '../topic-management-path';
import * as FAS from '@fortawesome/free-solid-svg-icons';
import * as FAR from '@fortawesome/free-regular-svg-icons';
import { UserService } from '../../../../core/user/user.service';
import { AUTHORITIES } from '../../../../core/authentication/authorities.constants';

@Component({
  selector: 'app-topic-info-template',
  templateUrl: './topic-info-template.component.html',
  styles: [],
})
export class TopicInfoTemplateComponent implements OnInit {
  FAS = FAS;
  FAR = FAR;
  TOPIC_MANAGEMENT_PATH_FULL = TOPIC_MANAGEMENT_PATH_FULL;

  @Input() userTopics: UserTopicDto;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  canManageTopics(): boolean {
    return this.userService.hasAuthority(AUTHORITIES.TOPICMANAGER_WRITE);
  }
}
