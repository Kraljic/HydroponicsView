import { environment } from '../../../../environments/environment';

export const AUTH_URL = {
  LOGIN: environment.apiUrl + '/auth/authenticate',
  REFRESH: environment.apiUrl + '/auth/refresh-token/web',
  LOGOUT: environment.apiUrl + '/auth/revoke-token/web',
  VALIDATE: environment.apiUrl + '/auth/validate-token',
};
