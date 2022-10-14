import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { SensorDto } from '../_model/sensor-dto';
import { SensorCommand } from '../_model/sensor-command';
import { SensorVariableCommand } from '../_model/sensor-variable-command';

@Injectable({
  providedIn: 'root',
})
export class SensorService {
  url = environment.apiUrl + '/hydroponic/api/sensor';

  constructor(private http: HttpClient) {}

  getAllSensors(): Observable<SensorDto[]> {
    return this.http.get<SensorDto[]>(`${this.url}`);
  }

  getAllSensorsByDeviceId(deviceId: number): Observable<SensorDto[]> {
    return this.http.get<SensorDto[]>(`${this.url}/device/${deviceId}`);
  }

  getSensorById(sensorId: number): Observable<SensorDto> {
    return this.http.get<SensorDto>(`${this.url}/${sensorId}`);
  }

  createSensor(
    sensorCommand: SensorCommand,
    deviceId: number,
    sensorTypeId: number
  ): Observable<SensorDto> {
    return this.http.post<SensorDto>(
      `${this.url}?deviceId=${deviceId}&sensorTypeId=${sensorTypeId}`,
      sensorCommand
    );
  }

  updateSensor(
    sensorId: number,
    sensorCommand: SensorCommand
  ): Observable<SensorDto> {
    return this.http.put<SensorDto>(`${this.url}/${sensorId}`, sensorCommand);
  }

  updateSimpleVariable(
    sensorId: number,
    sensorVariableCommand: SensorVariableCommand
  ): Observable<SensorDto> {
    return this.http.put<SensorDto>(
      `${this.url}/variable/${sensorId}`,
      sensorVariableCommand
    );
  }

  deleteSensor(sensorId: number): Observable<any> {
    return this.http.delete(`${this.url}/${sensorId}`);
  }
}
