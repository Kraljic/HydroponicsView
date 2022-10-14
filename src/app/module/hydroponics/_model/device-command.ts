import { DeviceDto } from './device-dto';
export class DeviceCommand {
  name: string;
  description: string;
  firmware: string;

  constructor(deviceDto?: DeviceDto) {
    if (deviceDto) {
      this.name = deviceDto.name;
      this.description = deviceDto.description;
      this.firmware = deviceDto.firmware;
    }
  }
}
