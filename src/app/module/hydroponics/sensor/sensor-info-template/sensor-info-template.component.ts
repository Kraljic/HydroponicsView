import { Component, OnInit, Input } from '@angular/core';
import { SensorDto } from '../../_model/sensor-dto';

@Component({
  selector: 'app-sensor-info-template',
  templateUrl: './sensor-info-template.component.html',
  styles: [],
})
export class SensorInfoTemplateComponent implements OnInit {
  @Input() sensor: SensorDto;

  constructor() {}

  ngOnInit(): void {}
}
