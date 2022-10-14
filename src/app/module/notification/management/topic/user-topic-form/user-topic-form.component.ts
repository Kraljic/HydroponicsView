import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TopicManagementCommand } from '../../../_model/topic-management-command';
import { ManagementTopicDto } from '../../../_model/management-topic-dto';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DropdownConfigService } from '../../../../shared/dropdown/dropdown-config.service';
import { MULTISELECT_WITH_SEARCH } from '../../../../shared/dropdown/dorpdown.config';
import { TopicManagementService } from '../topic-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { getUserTopicFormValidator } from './user-topic-form.validation';
import { ErrorHandlerService } from '../../../../core/error-handler/error-handler.service';
import { TOPIC_MANAGEMENT_PATH_FULL } from '../topic-management-path';
import { NotificationService } from '../../../../shared/notification/notification.service';

@Component({
  selector: 'app-user-topic-form',
  templateUrl: './user-topic-form.component.html',
  styles: [],
})
export class UserTopicFormComponent implements OnInit {
  topicManagementCommand: TopicManagementCommand;
  username: string;
  topicsList: ManagementTopicDto[];
  topicsSelected: ManagementTopicDto[];

  formGroup: FormGroup;
  multiselectSettings: IDropdownSettings;

  saving: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private dropdownConfigService: DropdownConfigService,
    private topicManagementService: TopicManagementService,
    private notificationService: NotificationService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.paramMap.get('username');

    this.topicManagementCommand = new TopicManagementCommand();

    this.formGroup = getUserTopicFormValidator(this.formBuilder);

    this.dropdownConfigService
      .build('id', 'name', MULTISELECT_WITH_SEARCH)
      .subscribe((settings) => (this.multiselectSettings = settings));

    this.topicManagementService.findAllTopics().subscribe(
      (topics) => (this.topicsList = topics),
      (err) =>
        this.errorHandlerService.simpleErrorHandler(err, [
          TOPIC_MANAGEMENT_PATH_FULL.INFO,
        ])
    );

    this.topicManagementService.findAllByUser(this.username).subscribe(
      (userTopics) => (this.topicsSelected = userTopics),
      (err) =>
        this.errorHandlerService.simpleErrorHandler(err, [
          TOPIC_MANAGEMENT_PATH_FULL.INFO,
        ])
    );
  }

  get f() {
    return this.formGroup.controls;
  }

  topicsOnItemSelect(topic: ManagementTopicDto) {}

  save() {
    this.topicManagementCommand.topics = this.topicsSelected.map((t) => t.id);

    this.topicManagementService
      .addUserToTopics(this.username, this.topicManagementCommand)
      .subscribe(
        (userTopics) => {
          this.notificationService.success(
            'notification.success.topicManagement.save',
            {
              username: this.username,
            }
          );
          this.router.navigate([TOPIC_MANAGEMENT_PATH_FULL.INFO]);
        },
        (err) => this.errorHandlerService.validationErrorHandler(err, this.f)
      );
  }

  cancle() {
    this.router.navigate([TOPIC_MANAGEMENT_PATH_FULL.INFO]);
  }
}
