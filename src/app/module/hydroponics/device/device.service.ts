import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { DeviceDto } from '../_model/device-dto';
import { DeviceCommand } from '../_model/device-command';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  url = environment.apiUrl + '/hydroponic/api/device';

  constructor(private http: HttpClient) {}

  getAllDevices(): Observable<DeviceDto[]> {
    return this.http.get<DeviceDto[]>(`${this.url}`);
  }

  getDeviceById(deviceId: number): Observable<DeviceDto> {
    return this.http.get<DeviceDto>(`${this.url}/${deviceId}`);
  }

  createDevice(deviceCommand: DeviceCommand): Observable<DeviceDto> {
    return this.http.post<DeviceDto>(`${this.url}`, deviceCommand);
  }

  updateDevice(
    deviceId: number,
    deviceCommand: DeviceCommand
  ): Observable<DeviceDto> {
    return this.http.put<DeviceDto>(`${this.url}/${deviceId}`, deviceCommand);
  }

  deleteDevice(deviceId: number): Observable<any> {
    return this.http.delete(`${this.url}/${deviceId}`);
  }
}
