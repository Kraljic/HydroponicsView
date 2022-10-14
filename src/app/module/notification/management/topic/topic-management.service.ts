import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { ManagementTopicDto } from '../../_model/management-topic-dto';
import { TopicManagementCommand } from '../../_model/topic-management-command';
import { options } from 'less';
import { UserTopicDto } from '../../_model/user-topic-dto';

@Injectable({
  providedIn: 'root',
})
export class TopicManagementService {
  url = environment.apiUrl + '/management/api/notification/topic';

  constructor(private http: HttpClient) {}

  findAllTopics(): Observable<ManagementTopicDto[]> {
    return this.http.get<ManagementTopicDto[]>(this.url);
  }

  findAllUsersTopic(): Observable<UserTopicDto[]> {
    return this.http.get<UserTopicDto[]>(`${this.url}/users`);
  }

  findAllByUser(username: string): Observable<ManagementTopicDto[]> {
    return this.http.get<ManagementTopicDto[]>(`${this.url}/users/${username}`);
  }

  addUserToTopics(
    username: string,
    topicManagementCommand: TopicManagementCommand
  ): Observable<ManagementTopicDto[]> {
    return this.http.post<ManagementTopicDto[]>(
      `${this.url}/users/${username}`,
      topicManagementCommand
    );
  }

  rebuildTopicList(): Observable<ManagementTopicDto[]> {
    return this.http.get<ManagementTopicDto[]>(`${this.url}/rebuild`);
  }

  resetTopicKeys(): Observable<any> {
    return this.http.get(`${this.url}/resetKeys`);
  }
}
