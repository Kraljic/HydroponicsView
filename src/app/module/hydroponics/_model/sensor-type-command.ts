import { SensorTypeDto } from './sensor-type-dto';
export class SensorTypeCommand {
  type: string;
  measuringUnit: string;

  constructor(sensorTypeDto?: SensorTypeDto) {
    if (sensorTypeDto) {
      this.type = sensorTypeDto.type;
      this.measuringUnit = sensorTypeDto.measuringUnit;
    }
  }
}
