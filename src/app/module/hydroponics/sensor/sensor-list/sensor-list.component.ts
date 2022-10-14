import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/user/user.service';
import { AUTHORITIES } from '../../../core/authentication/authorities.constants';
import * as FAS from '@fortawesome/free-solid-svg-icons';
import * as FAR from '@fortawesome/free-regular-svg-icons';
import { SensorDto } from '../../_model/sensor-dto';
import { SENSOR_PATH_FULL } from '../../sensor/sensor-path';
import { SensorService } from '../sensor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sensor-list',
  templateUrl: './sensor-list.component.html',
  styles: [],
})
export class SensorListComponent implements OnInit {
  FAS = FAS;
  FAR = FAR;
  SENSOR_PATH_FULL = SENSOR_PATH_FULL;

  deviceId: number;
  sensorList: SensorDto[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private sensorService: SensorService
  ) {}

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.queryParamMap.get('deviceId');
    if (id) {
      this.deviceId = parseInt(id) != NaN ? parseInt(id) : undefined;
    }

    if (this.deviceId) {
      this.sensorService
        .getAllSensorsByDeviceId(this.deviceId)
        .subscribe((sensors) => (this.sensorList = sensors));
    } else {
      this.sensorService
        .getAllSensors()
        .subscribe((sensors) => (this.sensorList = sensors));
    }
  }

  hasSensorWritePermission(): boolean {
    return this.userService.hasAuthority(AUTHORITIES.HYDROPONICS_WRITE_SENSOR);
  }

  hasSensorVariableWritePermission(): boolean {
    return this.userService.hasAuthority(
      AUTHORITIES.HYDROPONICS_WRITE_SENSOR_VARIABLE
    );
  }

  sensorDeleted(sensor: SensorDto) {
    this.sensorList = this.sensorList.filter((s) => s.id != sensor.id);
  }
}
