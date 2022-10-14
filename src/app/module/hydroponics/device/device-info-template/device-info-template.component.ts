import { Component, OnInit, Input } from '@angular/core';
import { DeviceDto } from '../../_model/device-dto';

@Component({
  selector: 'app-device-info-template',
  templateUrl: './device-info-template.component.html',
  styles: [],
})
export class DeviceInfoTemplateComponent implements OnInit {
  @Input() device: DeviceDto;

  constructor() {}

  ngOnInit(): void {}
}
