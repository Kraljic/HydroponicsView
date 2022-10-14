import { Component, OnInit } from '@angular/core';
import { DeviceDto } from '../../_model/device-dto';
import { SensorTypeDto } from '../../_model/sensor-type-dto';
import { DeviceService } from '../../device/device.service';
import { SensorTypeService } from '../../sensor-type/sensor-type.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DropdownConfigService } from '../../../shared/dropdown/dropdown-config.service';
import { SINGLESELECT_WITH_SEARCH } from '../../../shared/dropdown/dorpdown.config';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sensor-create',
  templateUrl: './sensor-create.component.html',
  styles: [],
})
export class SensorCreateComponent implements OnInit {
  device: DeviceDto;
  sensorType: SensorTypeDto;

  deviceList: DeviceDto[] = [];
  deviceSelected: DeviceDto[] = [];

  sensorTypeList: SensorTypeDto[];
  sensorTypeSelected: SensorTypeDto[];

  deviceMultiselectSettings: IDropdownSettings;
  sensorTypeMultiselectSettings: IDropdownSettings;

  constructor(
    private activatedRoute: ActivatedRoute,
    private deviceService: DeviceService,
    private sensorTypeService: SensorTypeService,
    private dropdownConfigService: DropdownConfigService
  ) {}

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.queryParamMap.get('deviceId');
    let deviceId: number;
    if (id) {
      deviceId = parseInt(id) != NaN ? parseInt(id) : undefined;
    }

    this.dropdownConfigService
      .build('id', 'name', SINGLESELECT_WITH_SEARCH)
      .subscribe((settings) => (this.deviceMultiselectSettings = settings));

    this.dropdownConfigService
      .build('id', 'type', SINGLESELECT_WITH_SEARCH)
      .subscribe((settings) => (this.sensorTypeMultiselectSettings = settings));

    this.deviceService.getAllDevices().subscribe((devices) => {
      this.deviceList = devices;

      if (deviceId) {
        this.deviceSelected = this.deviceList.filter((d) => d.id == deviceId);
        if (this.deviceSelected.length > 0) {
          this.device = this.deviceSelected[0];
        }
      }
    });

    this.sensorTypeService
      .getAllSensorTypes()
      .subscribe((sensorTypes) => (this.sensorTypeList = sensorTypes));
  }
}
