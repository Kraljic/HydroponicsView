import { AuthorityDto } from './authority.dto';
export class RoleDto {
  id: number;
  role: string;
  locked: boolean;
  authorities: AuthorityDto[];
}
