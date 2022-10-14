import { Component, OnInit } from '@angular/core';
import { DeviceDto } from '../../_model/device-dto';
import { ActivatedRoute } from '@angular/router';
import { DeviceService } from '../device.service';
import { DEVICE_PATH_FULL } from '../device-path';
import { ErrorHandlerService } from '../../../core/error-handler/error-handler.service';

@Component({
  selector: 'app-device-info',
  templateUrl: './device-info.component.html',
  styles: [],
})
export class DeviceInfoComponent implements OnInit {
  device: DeviceDto;

  constructor(
    private activatedRoute: ActivatedRoute,
    private deviceService: DeviceService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.deviceService.getDeviceById(parseInt(id)).subscribe(
      (device: DeviceDto) => (this.device = device),
      (err) =>
        this.errorHandlerService.simpleErrorHandler(err, [
          DEVICE_PATH_FULL.LIST,
        ])
    );
  }
}
