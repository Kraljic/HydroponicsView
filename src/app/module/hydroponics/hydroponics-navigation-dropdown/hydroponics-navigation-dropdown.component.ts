import { Component, OnInit } from '@angular/core';
import * as FAS from '@fortawesome/free-solid-svg-icons';
import * as FAR from '@fortawesome/free-regular-svg-icons';
import { DEVICE_PATH_FULL } from '../device/device-path';
import { SENSOR_PATH_FULL } from '../sensor/sensor-path';
import { SENSOR_TYPE_PATH_FULL } from '../sensor-type/sensor-type-path';

@Component({
  selector: 'app-hydroponics-navigation-dropdown',
  templateUrl: './hydroponics-navigation-dropdown.component.html',
  styles: [],
})
export class HydroponicsNavigationDropdownComponent implements OnInit {
  FAS = FAS;
  FAR = FAR;

  DEVICE_PATH_FULL = DEVICE_PATH_FULL;
  SENSOR_PATH_FULL = SENSOR_PATH_FULL;
  SENSOR_TYPE_PATH_FULL = SENSOR_TYPE_PATH_FULL;

  constructor() {}

  ngOnInit(): void {}
}
