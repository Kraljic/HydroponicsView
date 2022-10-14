import { Component, OnInit, Input } from '@angular/core';
import { SensorTypeCommand } from '../../_model/sensor-type-command';
import { FormGroup, FormBuilder } from '@angular/forms';
import { getSensorTypeFormValidator } from './sensor-type-form.validation';
import { Router } from '@angular/router';
import { SENSOR_TYPE_PATH_FULL } from '../sensor-type-path';
import { SensorTypeService } from '../sensor-type.service';
import { NotificationService } from '../../../shared/notification/notification.service';
import { ErrorHandlerService } from '../../../core/error-handler/error-handler.service';

@Component({
  selector: 'app-sensor-type-form',
  templateUrl: './sensor-type-form.component.html',
  styles: [],
})
export class SensorTypeFormComponent implements OnInit {
  @Input() formType: 'CREATE' | 'EDIT';
  @Input() sensorTypeCommand: SensorTypeCommand;

  /**
   * On sensorType edit
   */
  @Input() sensorTypeId: number;

  formGroup: FormGroup;

  saving: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private sensorTypeService: SensorTypeService,
    private notificationService: NotificationService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.sensorTypeCommand = this.sensorTypeCommand || new SensorTypeCommand();

    this.formGroup = getSensorTypeFormValidator(this.formBuilder);
  }

  get f() {
    return this.formGroup.controls;
  }

  save() {
    (this.formType === 'CREATE'
      ? this.sensorTypeService.createSensorType(this.sensorTypeCommand)
      : this.sensorTypeService.updateSensorType(
          this.sensorTypeId,
          this.sensorTypeCommand
        )
    ).subscribe(
      (sensorType) => {
        this.notificationService.success(
          'notification.success.sensorType.save',
          {
            sensorType: sensorType.type,
          }
        );
        this.router.navigate([SENSOR_TYPE_PATH_FULL.LIST]);
      },
      (err) => this.errorHandlerService.validationErrorHandler(err, this.f)
    );
  }

  cancle() {
    this.router.navigate([SENSOR_TYPE_PATH_FULL.LIST]);
  }
}
