import { RoleDto } from './role.dto';
export class UserDto {
  id: number;
  username: string;
  email: string;
  active: boolean;
  writeProtected: boolean;
  roles: RoleDto[];
  authorities: string[];
}
