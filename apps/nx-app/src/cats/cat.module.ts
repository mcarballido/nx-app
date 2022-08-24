import { Module } from '@nestjs/common';

import { CatController } from './controllers/cat.controller';
import { CatService } from './services/cat.service';
import { CAT_REPOSITORY } from './repositories/cat.repository';
import { CatInMemoryRepository } from './repositories/implementations/cat.in-memory.repository';

@Module({
  imports: [],
  controllers: [CatController],
  providers: [
    CatService,
    { provide: CAT_REPOSITORY, useClass: CatInMemoryRepository },
  ],
})
export class CatModule {}
