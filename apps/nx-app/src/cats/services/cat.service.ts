import { Inject, Injectable } from '@nestjs/common';

import { Cat } from '../entities/cat.entity';
import { CAT_REPOSITORY, ICatRepository } from '../repositories/cat.repository';

@Injectable()
export class CatService {
  constructor(@Inject(CAT_REPOSITORY) private repository: ICatRepository) {}

  async getAll(): Promise<Cat[]> {
    return this.repository.getAll();
  }

  async create(cat: Cat): Promise<Cat> {
    return this.repository.create(cat);
  }

  async getById(id: string): Promise<Cat> {
    return this.repository.getById(id);
  }

  async update(id: string, catUpdate: Cat): Promise<Cat> {
    return this.repository.update(id, catUpdate);
  }

  async delete(id: string): Promise<void> {
    return this.repository.delete(id);
  }
}
