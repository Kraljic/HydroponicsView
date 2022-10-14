import { SensorVariableDto } from './sensor-variable-dto';
export class SensorVariableCommand {
  minValue: number;
  maxValue: number;

  constructor(sensorVariableDto?: SensorVariableDto) {
    if (sensorVariableDto) {
      this.minValue = sensorVariableDto.minValue;
      this.maxValue = sensorVariableDto.maxValue;
    }
  }
}
