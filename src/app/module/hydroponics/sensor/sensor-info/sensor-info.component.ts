import { Component, OnInit } from '@angular/core';
import { SensorDto } from '../../_model/sensor-dto';
import { DeviceDto } from '../../_model/device-dto';
import { ActivatedRoute } from '@angular/router';
import { SensorService } from '../sensor.service';
import { ErrorHandlerService } from '../../../core/error-handler/error-handler.service';
import { SENSOR_PATH_FULL } from '../sensor-path';

@Component({
  selector: 'app-sensor-info',
  templateUrl: './sensor-info.component.html',
  styles: [],
})
export class SensorInfoComponent implements OnInit {
  sensor: SensorDto;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sensorService: SensorService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.sensorService.getSensorById(parseInt(id)).subscribe(
      (sensor: SensorDto) => (this.sensor = sensor),
      (err) =>
        this.errorHandlerService.simpleErrorHandler(err, [
          SENSOR_PATH_FULL.LIST,
        ])
    );
  }
}
