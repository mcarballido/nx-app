import { Module } from '@nestjs/common';

import { CatController } from './controllers/cat.controller';
import { CatService } from './services/cat.service';
import { CAT_REPOSITORY } from './repositories/cat.repository';
import { provideCatRepositoryClass } from './config/database';
import {CatMapper} from "./mappers/cat.mapper";

@Module({
  imports: [],
  controllers: [CatController],
  providers: [
    CatService,
    CatMapper,
    { provide: CAT_REPOSITORY, useClass: provideCatRepositoryClass() },
  ],
})
export class CatModule {}
