import { Module } from '@nestjs/common';

import { CatController } from './controllers/cat.controller';
import { CatService } from './services/cat.service';
import { CAT_REPOSITORY } from './repositories/cat.repository';
import { provideCatRepositoryClass } from './config/database';

@Module({
  imports: [],
  controllers: [CatController],
  providers: [
    CatService,
    { provide: CAT_REPOSITORY, useClass: provideCatRepositoryClass() },
  ],
})
export class CatModule {}
