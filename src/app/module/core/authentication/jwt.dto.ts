export class JwtDto {
  /**
   * Subjekt - Korisnicko ime
   */
  sub: string;
  /**
   * Korisnikove dozvole
   */
  authorities: string[];
  /**
   * Vrijeme kada ce jwt isteci
   */
  exp: number;

  /**
   * Dohvati koliko vremena je jos jwt validan u sekundama
   */
  public getExpirationTime(): number {
    let expires = new Date(this.exp * 1000);
    let timeout = expires.getTime() - Date.now();

    return timeout;
  }
}
