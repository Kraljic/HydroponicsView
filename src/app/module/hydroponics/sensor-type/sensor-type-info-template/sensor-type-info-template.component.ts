import { Component, OnInit, Input } from '@angular/core';
import { SensorTypeDto } from '../../_model/sensor-type-dto';

@Component({
  selector: 'app-sensor-type-info-template',
  templateUrl: './sensor-type-info-template.component.html',
  styles: [],
})
export class SensorTypeInfoTemplateComponent implements OnInit {
  @Input() sensorType: SensorTypeDto;

  constructor() {}

  ngOnInit(): void {}
}
