import { Component, OnInit } from '@angular/core';
import * as FAS from '@fortawesome/free-solid-svg-icons';
import * as FAR from '@fortawesome/free-regular-svg-icons';
import { DeviceDto } from '../../_model/device-dto';
import { UserService } from '../../../core/user/user.service';
import { AUTHORITIES } from '../../../core/authentication/authorities.constants';
import { DEVICE_PATH_FULL } from '../device-path';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styles: [],
})
export class DeviceListComponent implements OnInit {
  FAS = FAS;
  FAR = FAR;
  DEVICE_PATH_FULL = DEVICE_PATH_FULL;

  deviceList: DeviceDto[];

  constructor(
    private userService: UserService,
    private deviceService: DeviceService
  ) {}

  ngOnInit(): void {
    this.deviceService
      .getAllDevices()
      .subscribe((devices) => (this.deviceList = devices));
  }

  hasDeviceWritePermission(): boolean {
    return this.userService.hasAuthority(AUTHORITIES.HYDROPONICS_WRITE_DEVICE);
  }

  deviceDeleted(device: DeviceDto) {
    this.deviceList = this.deviceList.filter((d) => d.id != device.id);
  }
}
