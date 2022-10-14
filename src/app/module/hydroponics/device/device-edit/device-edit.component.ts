import { Component, OnInit } from '@angular/core';
import { GenericLoaderService } from '../../../core/error-handler/generic-loader.service';
import { DeviceService } from '../device.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DEVICE_PATH_FULL } from '../device-path';
import { DeviceDto } from '../../_model/device-dto';
import { DeviceCommand } from '../../_model/device-command';
import { ErrorHandlerService } from '../../../core/error-handler/error-handler.service';

@Component({
  selector: 'app-device-edit',
  templateUrl: './device-edit.component.html',
  styles: [],
})
export class DeviceEditComponent implements OnInit {
  device: DeviceDto;
  deviceCommand: DeviceCommand;

  constructor(
    private activatedRoute: ActivatedRoute,
    private deviceService: DeviceService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.deviceService.getDeviceById(parseInt(id)).subscribe(
      (device: DeviceDto) => {
        this.device = device;
        this.deviceCommand = new DeviceCommand(device);
      },
      (err) =>
        this.errorHandlerService.simpleErrorHandler(err, [
          DEVICE_PATH_FULL.LIST,
        ])
    );
  }
}
