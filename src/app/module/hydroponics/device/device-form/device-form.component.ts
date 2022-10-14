import { Component, OnInit, Input } from '@angular/core';
import { DeviceCommand } from '../../_model/device-command';
import { FormGroup, FormBuilder } from '@angular/forms';
import { getDeviceFormValidator } from './device-form.validation';
import { DEVICE_PATH_FULL } from '../device-path';
import { Router } from '@angular/router';
import { DeviceService } from '../device.service';
import { DeviceDto } from '../../_model/device-dto';
import { NotificationService } from '../../../shared/notification/notification.service';
import { ErrorHandlerService } from '../../../core/error-handler/error-handler.service';

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styles: [],
})
export class DeviceFormComponent implements OnInit {
  @Input() formType: 'CREATE' | 'EDIT';
  @Input() deviceCommand: DeviceCommand;

  /**
   * On device edit
   */
  @Input() deviceId: number;

  formGroup: FormGroup;

  saving: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private deviceService: DeviceService,
    private notificationService: NotificationService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.deviceCommand = this.deviceCommand || new DeviceCommand();

    this.formGroup = getDeviceFormValidator(this.formBuilder);
  }

  get f() {
    return this.formGroup.controls;
  }

  save() {
    (this.formType === 'CREATE'
      ? this.deviceService.createDevice(this.deviceCommand)
      : this.deviceService.updateDevice(this.deviceId, this.deviceCommand)
    ).subscribe(
      (device: DeviceDto) => {
        this.notificationService.success('notification.success.device.save', {
          device: device.name,
        });
        this.router.navigate([DEVICE_PATH_FULL.LIST]);
      },
      (err) => this.errorHandlerService.validationErrorHandler(err, this.f)
    );
  }

  cancle() {
    this.router.navigate([DEVICE_PATH_FULL.LIST]);
  }
}
