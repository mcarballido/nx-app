import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { CatController } from './controllers/cat.controller';
import { CatService } from './services/cat.service';
import { CAT_REPOSITORY } from './repositories/cat.repository';
import { provideCatRepositoryClass } from './config/database';
import { CatMapper } from './mappers/cat.mapper';
import { QUEUES } from '../shared/constants';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUES.CAT,
    }),
  ],
  controllers: [CatController],
  providers: [
    CatService,
    CatMapper,
    { provide: CAT_REPOSITORY, useClass: provideCatRepositoryClass() },
  ],
})
export class CatModule {}
