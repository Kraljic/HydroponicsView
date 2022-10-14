import { SimpleTopicDto } from './simple-topic-dto';
export class UserTopicDto {
  id: number;
  username: string;
  active: boolean;
  topics: SimpleTopicDto[];
}
