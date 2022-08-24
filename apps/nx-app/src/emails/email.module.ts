import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { QUEUES } from '../shared/constants';
import { CatEventsConsumer } from './consumers/cat.consumer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: QUEUES.CAT,
    }),
  ],
  controllers: [],
  providers: [CatEventsConsumer],
})
export class EmailModule {}
