import { Component, OnInit } from '@angular/core';
import { SensorVariableCommand } from '../../_model/sensor-variable-command';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SensorService } from '../sensor.service';
import { NotificationService } from '../../../shared/notification/notification.service';
import { ErrorHandlerService } from '../../../core/error-handler/error-handler.service';
import { SENSOR_PATH_FULL } from '../sensor-path';
import { SensorDto } from '../../_model/sensor-dto';
import { getSensorVariableFormValidator } from './sensor-variable-form.validation';

@Component({
  selector: 'app-sensor-variable-form',
  templateUrl: './sensor-variable-form.component.html',
  styles: [],
})
export class SensorVariableFormComponent implements OnInit {
  sensorVariableCommand: SensorVariableCommand;
  sensor: SensorDto;

  sensorName: string;
  deviceName: string;
  sensorType: string;

  formGroup: FormGroup;

  saving: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sensorService: SensorService,
    private notificationService: NotificationService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    this.sensorService.getSensorById(parseInt(id)).subscribe(
      (sensor: SensorDto) => {
        this.sensor = sensor;
        this.sensorVariableCommand = new SensorVariableCommand(
          sensor.simpleVariable || undefined
        );

        this.sensorName = sensor.name;
        this.deviceName = sensor.device.name;
        this.sensorType = sensor.sensorType.type;
      },
      (err) =>
        this.errorHandlerService.simpleErrorHandler(err, [
          SENSOR_PATH_FULL.LIST,
        ])
    );

    this.formGroup = getSensorVariableFormValidator(this.formBuilder);
  }

  get f() {
    return this.formGroup.controls;
  }

  save() {
    this.sensorService
      .updateSimpleVariable(this.sensor.id, this.sensorVariableCommand)
      .subscribe(
        (sensor) => {
          this.notificationService.success(
            'notification.success.sensorVariable.save',
            {
              sensor: sensor.name,
            }
          );
          this.router.navigate([SENSOR_PATH_FULL.INFO, this.sensor.id]);
        },
        (err) => this.errorHandlerService.validationErrorHandler(err, this.f)
      );
  }

  cancle() {
    this.router.navigate([SENSOR_PATH_FULL.LIST]);
  }
}
