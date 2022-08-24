import { Module } from '@nestjs/common';
import { CatModule } from './cats/cat.module';

@Module({
  imports: [
    CatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
