import { SensorDto } from './sensor-dto';
export class SensorCommand {
  name: string;
  isManaged: boolean;

  constructor(sensorDto?: SensorDto) {
    if (sensorDto) {
      this.name = sensorDto.name;
      this.isManaged = sensorDto.isManaged;
    }
  }
}
