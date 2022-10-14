import { SensorValueDto } from './sensor-value-dto';
import { SensorVariableDto } from './sensor-variable-dto';
import { DeviceDto } from './device-dto';
import { SensorTypeDto } from './sensor-type-dto';

export class SensorDto {
  id: number;
  name: string;
  isManaged: boolean;

  simpleValue: SensorValueDto;
  simpleVariable: SensorVariableDto;
  device: DeviceDto;
  sensorType: SensorTypeDto;
}
