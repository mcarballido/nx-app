import { Type } from '@nestjs/common';

import { ICatRepository } from '../repositories/cat.repository';
import { CatInMemoryRepository } from '../repositories/implementations/cat.in-memory.repository';

export function provideCatRepositoryClass(): Type<ICatRepository> {
  switch (process.env.DB_HOST) {
    case 'postgres':
    case 'mongodb':
    default:
      return CatInMemoryRepository;
  }
}
