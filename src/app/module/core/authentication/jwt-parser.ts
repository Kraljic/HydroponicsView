import { JwtDto } from './jwt.dto';
export class JwtParser {
  static parse(jwt: string): JwtDto {
    if (!jwt) {
      return null;
    }

    let bodyData = atob(jwt.split('.')[1]);
    const jwtTokenBody = JSON.parse(bodyData);

    let jwtObject = new JwtDto();
    jwtObject.sub = jwtTokenBody.sub;
    jwtObject.exp = jwtTokenBody.exp;
    jwtObject.authorities = jwtTokenBody.authorities;

    return jwtObject;
  }
}
