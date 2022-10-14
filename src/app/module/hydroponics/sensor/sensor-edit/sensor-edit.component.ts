import { Component, OnInit } from '@angular/core';
import { GenericLoaderService } from '../../../core/error-handler/generic-loader.service';
import { ActivatedRoute } from '@angular/router';
import { SensorService } from '../sensor.service';
import { SENSOR_PATH_FULL } from '../sensor-path';
import { SensorDto } from '../../_model/sensor-dto';
import { SensorCommand } from '../../_model/sensor-command';
import { ErrorHandlerService } from '../../../core/error-handler/error-handler.service';

@Component({
  selector: 'app-sensor-edit',
  templateUrl: './sensor-edit.component.html',
  styles: [],
})
export class SensorEditComponent implements OnInit {
  sensor: SensorDto;
  sensorCommand: SensorCommand;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sensorService: SensorService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.sensorService.getSensorById(parseInt(id)).subscribe(
      (sensor: SensorDto) => {
        this.sensor = sensor;
        this.sensorCommand = new SensorCommand(sensor);
      },
      (err) =>
        this.errorHandlerService.simpleErrorHandler(err, [
          SENSOR_PATH_FULL.LIST,
        ])
    );
  }
}
