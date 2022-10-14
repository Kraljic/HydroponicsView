import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SensorCommand } from '../../_model/sensor-command';
import { getSensorFormValidator } from './sensor-form.validation';
import { SENSOR_PATH_FULL } from '../sensor-path';
import { Router } from '@angular/router';
import { SensorService } from '../sensor.service';
import { NotificationService } from '../../../shared/notification/notification.service';
import { ErrorHandlerService } from '../../../core/error-handler/error-handler.service';

@Component({
  selector: 'app-sensor-form',
  templateUrl: './sensor-form.component.html',
  styles: [],
})
export class SensorFormComponent implements OnInit {
  @Input() formType: 'CREATE' | 'EDIT';
  @Input() sensorCommand: SensorCommand;

  /**
   * On sensor edit
   */
  @Input() sensorId: number;

  /**
   * On sensor add
   */
  @Input() deviceId: number;

  /**
   * On sensor add
   */
  @Input() sensorTypeId: number;

  formGroup: FormGroup;

  saving: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private sensorService: SensorService,
    private notificationService: NotificationService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.sensorCommand = this.sensorCommand || new SensorCommand();

    this.formGroup = getSensorFormValidator(this.formBuilder);
  }

  get f() {
    return this.formGroup.controls;
  }

  save() {
    (this.formType === 'CREATE'
      ? this.sensorService.createSensor(
          this.sensorCommand,
          this.deviceId,
          this.sensorTypeId
        )
      : this.sensorService.updateSensor(this.sensorId, this.sensorCommand)
    ).subscribe(
      (sensor) => {
        this.notificationService.success('notification.success.sensor.save', {
          sensor: sensor.name,
        });
        this.router.navigate([SENSOR_PATH_FULL.LIST]);
      },
      (err) => this.errorHandlerService.validationErrorHandler(err, this.f)
    );
  }

  cancle() {
    this.router.navigate([SENSOR_PATH_FULL.LIST]);
  }
}
