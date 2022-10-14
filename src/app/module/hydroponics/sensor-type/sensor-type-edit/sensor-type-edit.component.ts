import { Component, OnInit } from '@angular/core';
import { SensorTypeDto } from '../../_model/sensor-type-dto';
import { SensorTypeCommand } from '../../_model/sensor-type-command';
import { GenericLoaderService } from '../../../core/error-handler/generic-loader.service';
import { ActivatedRoute } from '@angular/router';
import { SensorTypeService } from '../sensor-type.service';
import { SENSOR_TYPE_PATH_FULL } from '../sensor-type-path';
import { ErrorHandlerService } from '../../../core/error-handler/error-handler.service';

@Component({
  selector: 'app-sensor-type-edit',
  templateUrl: './sensor-type-edit.component.html',
  styles: [],
})
export class SensorTypeEditComponent implements OnInit {
  sensorType: SensorTypeDto;
  sensorTypeCommand: SensorTypeCommand;

  constructor(
    private activatedRoute: ActivatedRoute,
    private sensorTypeService: SensorTypeService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.sensorTypeService.getSensorTypeById(parseInt(id)).subscribe(
      (sensorType: SensorTypeDto) => {
        this.sensorType = sensorType;
        this.sensorTypeCommand = new SensorTypeCommand(sensorType);
      },
      (err) =>
        this.errorHandlerService.simpleErrorHandler(err, [
          SENSOR_TYPE_PATH_FULL.LIST,
        ])
    );
  }
}
