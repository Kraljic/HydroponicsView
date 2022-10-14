import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SensorDto } from '../../../_model/sensor-dto';
import { SENSOR_PATH_FULL } from '../../sensor-path';
import { MODAL_DELETE_CONFIG } from 'src/app/module/shared/modal/config/delete-config';
import * as FAS from '@fortawesome/free-solid-svg-icons';
import * as FAR from '@fortawesome/free-regular-svg-icons';
import { SensorService } from '../../sensor.service';
import { NotificationService } from '../../../../shared/notification/notification.service';
import { ErrorHandlerService } from '../../../../core/error-handler/error-handler.service';

@Component({
  selector: 'app-sensor-actions',
  templateUrl: './sensor-actions.component.html',
  styles: [],
})
export class SensorActionsComponent implements OnInit {
  FAS = FAS;
  FAR = FAR;
  SENSOR_PATH_FULL = SENSOR_PATH_FULL;
  MODAL_DELETE_CONFIG = MODAL_DELETE_CONFIG;

  @Input() sensor: SensorDto;
  @Input() hasWritePermission: boolean;
  @Input() hasSensorVariableWritePermission: boolean;
  @Output() sensorDeleted: EventEmitter<SensorDto> = new EventEmitter();

  constructor(
    private sensorService: SensorService,
    private notificationService: NotificationService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {}

  delete() {
    this.sensorService.deleteSensor(this.sensor.id).subscribe(
      () => {
        this.notificationService.success('notification.success.sensor.delete', {
          sensor: this.sensor.name,
        });
        this.sensorDeleted.emit(this.sensor);
      },
      (err) => this.errorHandlerService.simpleErrorHandler(err)
    );
  }
}
