import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { NotificationAccessTokenDto } from '../_model/notification-access-token-dto';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  url = environment.apiUrl + '/notification/api/token';

  constructor(private http: HttpClient) {}

  getToken(): Observable<NotificationAccessTokenDto> {
    return this.http.get<NotificationAccessTokenDto>(this.url);
  }

  resetToken(): Observable<NotificationAccessTokenDto> {
    return this.http.get<NotificationAccessTokenDto>(`${this.url}/reset`);
  }
}
