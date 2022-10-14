import { SimpleUserDto } from '../../core/user/simple-user.dto';
import { DeviceDto } from '../../hydroponics/_model/device-dto';

export class ManagementTopicDto {
  id: number;
  name: string;
  device: DeviceDto[];
  users: SimpleUserDto[];
}
