import { Cat } from '../entities/cat.entity';

export interface ICatRepository {
  create(cat: Cat): Promise<Cat>;
  getAll(): Promise<Cat[]>;
  getById(id: string): Promise<Cat>;
  update(id: string, catUpdate: Cat): Promise<Cat>;
  delete(id: string): Promise<void>;
}

export const CAR_REPOSITORY = 'CatRepository';
