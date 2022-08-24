import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { CatModule } from './cats/cat.module';
import { EmailModule } from './emails/email.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    CatModule,
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
