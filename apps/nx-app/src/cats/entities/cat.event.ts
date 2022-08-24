import { Cat } from './cat.entity';

export interface CatEvent {
  cat: Cat;
  date: Date;
}
