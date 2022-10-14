import { Component, OnInit } from '@angular/core';
import * as FAS from '@fortawesome/free-solid-svg-icons';
import * as FAR from '@fortawesome/free-regular-svg-icons';
import { AUTHORITIES } from '../../../core/authentication/authorities.constants';
import { UserService } from '../../../core/user/user.service';
import { SensorTypeDto } from '../../_model/sensor-type-dto';
import { SENSOR_TYPE_PATH_FULL } from '../sensor-type-path';
import { SensorTypeService } from '../sensor-type.service';

@Component({
  selector: 'app-sensor-type-list',
  templateUrl: './sensor-type-list.component.html',
  styles: [],
})
export class SensorTypeListComponent implements OnInit {
  FAS = FAS;
  FAR = FAR;
  SENSOR_TYPE_PATH_FULL = SENSOR_TYPE_PATH_FULL;

  sensorTypeList: SensorTypeDto[];

  constructor(
    private userService: UserService,
    private sensorTypeService: SensorTypeService
  ) {}

  ngOnInit(): void {
    this.sensorTypeService
      .getAllSensorTypes()
      .subscribe((sensorTypes) => (this.sensorTypeList = sensorTypes));
  }

  hasSensorTypeWritePermission(): boolean {
    return this.userService.hasAuthority(
      AUTHORITIES.HYDROPONICS_WRITE_SENSOR_TYPE
    );
  }

  sensorTypeDeleted(sensorType: SensorTypeDto) {
    this.sensorTypeList = this.sensorTypeList.filter(
      (st) => st.id != sensorType.id
    );
  }
}
