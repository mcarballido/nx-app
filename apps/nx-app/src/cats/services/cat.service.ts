import { Inject, Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

import { Cat } from '../entities/cat.entity';
import { CAT_REPOSITORY, ICatRepository } from '../repositories/cat.repository';
import { EVENTS, QUEUES } from '../../shared/constants';
import { CatEvent } from '../entities/cat.event';

@Injectable()
export class CatService {
  constructor(
    @InjectQueue(QUEUES.CAT) private queue: Queue<CatEvent>,
    @Inject(CAT_REPOSITORY) private repository: ICatRepository
  ) {}

  async getAll(): Promise<Cat[]> {
    return this.repository.getAll();
  }

  async create(cat: Cat): Promise<Cat> {
    const createdCat = await this.repository.create(cat);

    this.queue.add(EVENTS.CAT_CREATED, {
      cat: createdCat,
      date: new Date(),
    });

    return createdCat;
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
