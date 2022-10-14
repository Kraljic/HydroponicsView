export class UserRolesCommand {
  /**
   * username nije potreban za slanje zahtjeva prema serveru.
   * koristi se samo za laksu implementaciju prikaza u user-roles-form komponenti
   */
  username: string;
  roles: number[];
}
