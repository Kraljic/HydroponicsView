import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SensorTypeDto } from '../../../_model/sensor-type-dto';
import { MODAL_DELETE_CONFIG } from 'src/app/module/shared/modal/config/delete-config';
import * as FAR from '@fortawesome/free-regular-svg-icons';
import * as FAS from '@fortawesome/free-solid-svg-icons';
import { SENSOR_TYPE_PATH_FULL } from '../../sensor-type-path';
import { SensorTypeService } from '../../sensor-type.service';
import { NotificationService } from '../../../../shared/notification/notification.service';
import { ErrorHandlerService } from '../../../../core/error-handler/error-handler.service';

@Component({
  selector: 'app-sensor-type-actions',
  templateUrl: './sensor-type-actions.component.html',
  styles: [],
})
export class SensorTypeActionsComponent implements OnInit {
  FAS = FAS;
  FAR = FAR;
  SENSOR_TYPE_PATH_FULL = SENSOR_TYPE_PATH_FULL;
  MODAL_DELETE_CONFIG = MODAL_DELETE_CONFIG;

  @Input() sensorType: SensorTypeDto;
  @Input() hasWritePermission: boolean;
  @Output() sensorTypeDeleted: EventEmitter<SensorTypeDto> = new EventEmitter();

  constructor(
    private sensorTypeService: SensorTypeService,
    private notificationService: NotificationService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {}

  delete() {
    this.sensorTypeService.deleteSensorType(this.sensorType.id).subscribe(
      () => {
        this.notificationService.success(
          'notification.success.sensorType.delete',
          {
            sensorType: this.sensorType.type,
          }
        );
        this.sensorTypeDeleted.emit(this.sensorType);
      },
      (err) => this.errorHandlerService.simpleErrorHandler(err)
    );
  }
}
