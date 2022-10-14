import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DeviceDto } from '../../../_model/device-dto';
import { DEVICE_PATH_FULL } from '../../device-path';
import * as FAS from '@fortawesome/free-solid-svg-icons';
import * as FAR from '@fortawesome/free-regular-svg-icons';
import { MODAL_DELETE_CONFIG } from 'src/app/module/shared/modal/config/delete-config';
import { DeviceService } from '../../device.service';
import { NotificationService } from '../../../../shared/notification/notification.service';
import { ErrorHandlerService } from '../../../../core/error-handler/error-handler.service';
import { SENSOR_PATH_FULL } from '../../../sensor/sensor-path';

@Component({
  selector: 'app-device-actions',
  templateUrl: './device-actions.component.html',
  styles: [],
})
export class DeviceActionsComponent implements OnInit {
  FAS = FAS;
  FAR = FAR;
  DEVICE_PATH_FULL = DEVICE_PATH_FULL;
  SENSOR_PATH_FULL = SENSOR_PATH_FULL;
  MODAL_DELETE_CONFIG = MODAL_DELETE_CONFIG;

  @Input() device: DeviceDto;
  @Input() hasWritePermission: boolean;
  @Output() deviceDeleted: EventEmitter<DeviceDto> = new EventEmitter();

  constructor(
    private deviceService: DeviceService,
    private notificationService: NotificationService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {}

  delete() {
    this.deviceService.deleteDevice(this.device.id).subscribe(
      () => {
        this.notificationService.success('notification.success.device.delete', {
          device: this.device.name,
        });
        this.deviceDeleted.emit(this.device);
      },
      (err) => this.errorHandlerService.simpleErrorHandler(err)
    );
  }
}
