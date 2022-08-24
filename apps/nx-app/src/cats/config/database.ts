import { Type } from '@nestjs/common';

import { ICatRepository } from '../repositories/cat.repository';
import { CatInMemoryRepository } from '../repositories/implementations/cat.in-memory.repository';
import { DATABASE_HOSTS } from '../../shared/constants';

export function provideCatRepositoryClass(): Type<ICatRepository> {
  switch (process.env.DB_HOST) {
    case DATABASE_HOSTS.POSTGRES:
    case DATABASE_HOSTS.MONGODB:
    default:
      return CatInMemoryRepository;
  }
}
