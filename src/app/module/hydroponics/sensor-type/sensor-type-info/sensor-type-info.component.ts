import { Component, OnInit } from '@angular/core';
import { SensorTypeDto } from '../../_model/sensor-type-dto';
import { ActivatedRoute } from '@angular/router';
import { SensorTypeService } from '../sensor-type.service';
import { ErrorHandlerService } from '../../../core/error-handler/error-handler.service';
import { SENSOR_TYPE_PATH_FULL } from '../sensor-type-path';

@Component({
  selector: 'app-sensor-type-info',
  templateUrl: './sensor-type-info.component.html',
  styles: [],
})
export class SensorTypeInfoComponent implements OnInit {
  sensorType: SensorTypeDto;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sensorTypeService: SensorTypeService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.sensorTypeService.getSensorTypeById(parseInt(id)).subscribe(
      (sensorType: SensorTypeDto) => (this.sensorType = sensorType),
      (err) =>
        this.errorHandlerService.simpleErrorHandler(err, [
          SENSOR_TYPE_PATH_FULL.LIST,
        ])
    );
  }
}
