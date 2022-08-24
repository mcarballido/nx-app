import { Injectable } from '@nestjs/common';

@Injectable()
export class CatService {
  getData(): { message: string } {
    return { message: 'Welcome to nx-app!' };
  }
}
