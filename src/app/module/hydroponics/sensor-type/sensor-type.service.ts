import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { SensorTypeDto } from '../_model/sensor-type-dto';
import { SensorTypeCommand } from '../_model/sensor-type-command';

@Injectable({
  providedIn: 'root',
})
export class SensorTypeService {
  url = environment.apiUrl + '/hydroponic/api/sensorType';

  constructor(private http: HttpClient) {}

  getAllSensorTypes(): Observable<SensorTypeDto[]> {
    return this.http.get<SensorTypeDto[]>(`${this.url}`);
  }

  getSensorTypeById(sensorTypeId: number): Observable<SensorTypeDto> {
    return this.http.get<SensorTypeDto>(`${this.url}/${sensorTypeId}`);
  }

  createSensorType(
    sensorTypeCommand: SensorTypeCommand
  ): Observable<SensorTypeDto> {
    return this.http.post<SensorTypeDto>(`${this.url}`, sensorTypeCommand);
  }

  updateSensorType(
    sensorTypeId: number,
    sensorTypeCommand: SensorTypeCommand
  ): Observable<SensorTypeDto> {
    return this.http.put<SensorTypeDto>(
      `${this.url}/${sensorTypeId}`,
      sensorTypeCommand
    );
  }

  deleteSensorType(sensorTypeId: number): Observable<any> {
    return this.http.delete(`${this.url}/${sensorTypeId}`);
  }
}
